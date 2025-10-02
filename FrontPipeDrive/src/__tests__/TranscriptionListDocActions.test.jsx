import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TranscriptionList from '../TranscriptionList';
import { vi } from 'vitest';
import * as NotificationSystem from '../NotificationSystem';
import * as TranscriptionListService from '../TranscriptionList';
import FileOrFolder from '../FileOrFolder'; // Importar FileOrFolder para mockearlo
import DocActions from '../DocActions'; // Importar DocActions para mockearlo
import AIChat from '../AIChat'; // Importar AIChat para mockearlo

// Mock de fetch para simular las llamadas a la API
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock de showNotification
vi.spyOn(NotificationSystem, 'showNotification').mockImplementation(() => {});

const userId = 'testUser';

// Mockear los componentes hijos para aislar la prueba de TranscriptionList
vi.mock('../FileOrFolder', () => ({
  default: vi.fn(({ onItemClick, ...props }) => (
    <div data-testid="file-or-folder" onClick={() => onItemClick(props.id, props.name, props.mimeType)}>
      {props.name}
    </div>
  )),
}));

vi.mock('../DocActions', () => ({
  default: vi.fn(({ onActionClick }) => (
    <div data-testid="doc-actions">
      <button onClick={() => onActionClick('summarize')}>Resumen de la Llamada</button>
      <button onClick={() => onActionClick('proposal')}>Propuesta</button>
      <button onClick={() => onActionClick('questions')}>Preguntas</button>
      <button onClick={() => onActionClick('actions')}>Acciones</button>
    </div>
  )),
}));

vi.mock('../AIChat', () => ({
  default: vi.fn(({ documentContent }) => (
    <div data-testid="ai-chat">AI Chat with: {documentContent ? documentContent.substring(0, 20) : 'no content'}</div>
  )),
}));

describe('TranscriptionList DocActions and AIChat Interaction', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    NotificationSystem.showNotification.mockClear();
    vi.restoreAllMocks();
    vi.spyOn(NotificationSystem, 'showNotification').mockImplementation(() => {});
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockResolvedValue([]);
    vi.spyOn(TranscriptionListService, 'fetchFileContents').mockResolvedValue('Contenido de archivo mockeado');

    Object.defineProperty(window, 'location', {
      value: {
        search: `?userId=${userId}`,
      },
      writable: true,
    });

    // Mock para la llamada inicial a DriveRoot
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ GoogleDrive: { files: [] } }),
    });
  });

  it('should render DocActions when a .doc file is selected and activate AIChat on action click', async () => {
    // Mock de fetchFolderContents para simular la navegación (si fuera necesario)
    TranscriptionListService.fetchFolderContents.mockResolvedValueOnce([
      { id: 'doc123', name: 'Documento.docx', mimeType: 'application/vnd.google-apps.document' },
    ]);

    // Mock de fetchFileContents para el contenido del .doc
    TranscriptionListService.fetchFileContents.mockResolvedValueOnce('Contenido del documento .doc para IA.');

    render(<TranscriptionList userId={userId} />);

    // Simular la carga inicial (podría ser la raíz vacía o con un archivo)
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/DriveRoot'),
        expect.any(Object)
      );
    });
    
    // Cargar la lista de items para simular el click
    mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ GoogleDrive: { files: [
            { id: 'doc123', name: 'Documento.docx', mimeType: 'application/vnd.google-apps.document' },
        ] } }),
    });
    fireEvent.click(screen.getByText('Documento.docx')); // Simular clic en el archivo .doc

    await waitFor(() => {
      expect(TranscriptionListService.fetchFileContents).toHaveBeenCalledWith(
        { id: 'doc123', name: 'Documento.docx', mimeType: 'application/vnd.google-apps.document' },
        userId
      );
    });

    // Verificar que DocActions es visible
    expect(screen.getByTestId('doc-actions')).toBeInTheDocument();
    expect(screen.queryByTestId('ai-chat')).not.toBeInTheDocument(); // AIChat no debe ser visible todavía

    // Simular clic en un botón de acción de DocActions
    fireEvent.click(screen.getByText('Resumen de la Llamada'));

    // Verificar que AIChat se activa y recibe el contenido del documento
    await waitFor(() => {
      expect(screen.getByTestId('ai-chat')).toBeInTheDocument();
      expect(screen.getByText('AI Chat with: Contenido del documen')).toBeInTheDocument();
    });
  });

  it('should hide DocActions and AIChat when a non-.doc file is selected', async () => {
    // Mock de fetchFolderContents
    TranscriptionListService.fetchFolderContents.mockResolvedValueOnce([
      { id: 'txt123', name: 'Notas.txt', mimeType: 'text/plain' },
    ]);
    TranscriptionListService.fetchFileContents.mockResolvedValueOnce('Contenido del archivo .txt');

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/DriveRoot'),
        expect.any(Object)
      );
    });

    // Cargar la lista de items para simular el click
    mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ GoogleDrive: { files: [
            { id: 'txt123', name: 'Notas.txt', mimeType: 'text/plain' },
        ] } }),
    });
    fireEvent.click(screen.getByText('Notas.txt')); // Simular clic en el archivo .txt

    await waitFor(() => {
      expect(TranscriptionListService.fetchFileContents).toHaveBeenCalledWith(
        { id: 'txt123', name: 'Notas.txt', mimeType: 'text/plain' },
        userId
      );
    });

    // Verificar que DocActions y AIChat no son visibles
    expect(screen.queryByTestId('doc-actions')).not.toBeInTheDocument();
    expect(screen.queryByTestId('ai-chat')).not.toBeInTheDocument();
  });

  it('should deactivate AIChat when returning to list view', async () => {
    // Mock de fetchFolderContents para simular la navegación
    TranscriptionListService.fetchFolderContents.mockResolvedValueOnce([
      { id: 'doc123', name: 'Documento.docx', mimeType: 'application/vnd.google-apps.document' },
    ]);
    TranscriptionListService.fetchFileContents.mockResolvedValueOnce('Contenido del documento .doc para IA.');

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
            expect.stringContaining('/DriveRoot'),
            expect.any(Object)
        );
    });
    
    // Cargar la lista de items para simular el click
    mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ GoogleDrive: { files: [
            { id: 'doc123', name: 'Documento.docx', mimeType: 'application/vnd.google-apps.document' },
        ] } }),
    });
    fireEvent.click(screen.getByText('Documento.docx')); // Simular clic en el archivo .doc

    await waitFor(() => {
      expect(screen.getByTestId('doc-actions')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Resumen de la Llamada')); // Activar chat de IA

    await waitFor(() => {
      expect(screen.getByTestId('ai-chat')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Volver a la lista')); // Volver a la lista

    await waitFor(() => {
      expect(screen.queryByTestId('ai-chat')).not.toBeInTheDocument();
      expect(screen.queryByTestId('doc-actions')).not.toBeInTheDocument(); // DocActions también debería ocultarse
    });
  });
});
