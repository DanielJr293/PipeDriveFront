import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TranscriptionList from '../TranscriptionList';
import { vi } from 'vitest';
import * as NotificationSystem from '../NotificationSystem';
import * as TranscriptionListService from '../TranscriptionList';

// Mock de fetch para simular las llamadas a la API
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock de showNotification
vi.spyOn(NotificationSystem, 'showNotification').mockImplementation(() => {});

const userId = 'testUser';

describe('TranscriptionList DocActions Visibility', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    NotificationSystem.showNotification.mockClear();
    // Restablecer los mocks de servicio antes de cada prueba
    vi.restoreAllMocks();
    vi.spyOn(NotificationSystem, 'showNotification').mockImplementation(() => {});

    // Mock la URL para que siempre tenga un userId
    Object.defineProperty(window, 'location', {
      value: {
        search: `?userId=${userId}`,
      },
      writable: true,
    });
  });

  it('should render DocActions when a .doc file is selected', async () => {
    // Mock para fetchDriveItems (para la carga inicial si es necesario)
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockResolvedValueOnce([]);

    // Mock para fetchFileContents
    vi.spyOn(TranscriptionListService, 'fetchFileContents').mockResolvedValueOnce('Contenido del archivo .doc');

    const { rerender } = render(<TranscriptionList userId={userId} />);

    const docFile = {
      id: 'doc123',
      name: 'Documento.docx',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
    
    // Simular la selección de un archivo .doc llamando directamente a handleItemClick (o simulando su efecto)
    // Esto es un enfoque para la prueba unitaria sin depender del DOM completo de FileOrFolder
    // En una prueba de integración se haría fireEvent.click en el FileOrFolder
    await waitFor(() => {
      rerender(
        <TranscriptionList
          userId={userId}
          // Props simuladas para controlar el estado interno del componente para la prueba
          initialSelectedFile={docFile}
          initialFileContent={'Contenido del archivo .doc'}
          initialIsDocSelected={true} // Forzar el estado para que DocActions sea visible
        />
      );
    });

    expect(screen.getByText('Resumen de la Llamada')).toBeInTheDocument();
    expect(screen.getByText('Propuesta')).toBeInTheDocument();
    expect(screen.getByText('Preguntas')).toBeInTheDocument();
    expect(screen.getByText('Acciones')).toBeInTheDocument();
  });

  it('should hide DocActions when a non-.doc file is selected', async () => {
    // Mock para fetchDriveItems
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockResolvedValueOnce([]);

    // Mock para fetchFileContents
    vi.spyOn(TranscriptionListService, 'fetchFileContents').mockResolvedValueOnce('Contenido del archivo .txt');

    const { rerender } = render(<TranscriptionList userId={userId} />);

    const txtFile = {
      id: 'txt123',
      name: 'Notas.txt',
      mimeType: 'text/plain',
    };

    await waitFor(() => {
      rerender(
        <TranscriptionList
          userId={userId}
          initialSelectedFile={txtFile}
          initialFileContent={'Contenido del archivo .txt'}
          initialIsDocSelected={false} // Forzar el estado para que DocActions sea oculto
        />
      );
    });

    expect(screen.queryByText('Resumen de la Llamada')).not.toBeInTheDocument();
    expect(screen.queryByText('Propuesta')).not.toBeInTheDocument();
    expect(screen.queryByText('Preguntas')).not.toBeInTheDocument();
    expect(screen.queryByText('Acciones')).not.toBeInTheDocument();
  });
});
