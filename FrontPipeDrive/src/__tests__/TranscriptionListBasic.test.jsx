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

describe('TranscriptionList Basic Functionality', () => {
  const userId = 'testUserId';
  const mockFolderId = 'folder123';
  const mockRootItems = [
    { id: 'folder1', name: 'Folder 1', mimeType: 'application/vnd.google-apps.folder' },
    { id: 'file1', name: 'File 1.txt', mimeType: 'text/plain' },
  ];
  const mockSubfolderItems = [
    { id: 'subfile1', name: 'Subfile 1.doc', mimeType: 'application/msword' },
  ];

  beforeEach(() => {
    mockFetch.mockClear();
    NotificationSystem.showNotification.mockClear();
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockResolvedValue(mockRootItems);
    vi.spyOn(TranscriptionListService, 'fetchFileContents').mockResolvedValue('Contenido de prueba');

    // Mock la URL para que siempre tenga un userId
    Object.defineProperty(window, 'location', {
      value: {
        search: `?userId=${userId}`,
      },
      writable: true,
    });
  });

  it('should display loading state initially', () => {
    render(<TranscriptionList userId={userId} />);
    expect(screen.getByText(/Cargando archivos de Google Drive.../i)).toBeInTheDocument();
  });

  it('should load root folder items on initial render', async () => {
    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(screen.getByText('Folder 1')).toBeInTheDocument();
      expect(screen.getByText('File 1.txt')).toBeInTheDocument();
    });

    expect(TranscriptionListService.fetchFolderContents).toHaveBeenCalledWith({ id: 'root' }, userId);
    expect(NotificationSystem.showNotification).toHaveBeenCalledWith('Archivos cargados correctamente.', 'success');
  });

  it('should navigate to a subfolder on folder click', async () => {
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockResolvedValueOnce(mockRootItems);
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockResolvedValueOnce(mockSubfolderItems);

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(screen.getByText('Folder 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Folder 1'));

    await waitFor(() => {
      expect(screen.getByText('Subfile 1.doc')).toBeInTheDocument();
    });

    expect(TranscriptionListService.fetchFolderContents).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'folder1', mimeType: 'application/vnd.google-apps.folder' }),
      userId
    );
    expect(NotificationSystem.showNotification).toHaveBeenCalledWith('Carpeta "Folder 1" cargada correctamente.', 'success');
  });

  it('should handle back navigation', async () => {
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockResolvedValueOnce(mockRootItems); 
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockResolvedValueOnce(mockSubfolderItems); 
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockResolvedValueOnce(mockRootItems); 

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(screen.getByText('Folder 1')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Folder 1'));
    await waitFor(() => {
      expect(screen.getByText('Subfile 1.doc')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Volver a la carpeta anterior'));

    await waitFor(() => {
      expect(screen.getByText('Folder 1')).toBeInTheDocument();
      expect(screen.getByText('File 1.txt')).toBeInTheDocument();
    });
    expect(NotificationSystem.showNotification).toHaveBeenCalledWith('Volviendo a la carpeta anterior.', 'info');
  });

  it('should display file content on file click and update states', async () => {
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockResolvedValueOnce(mockRootItems); 
    const mockFileContent = 'Contenido del archivo de prueba.';
    vi.spyOn(TranscriptionListService, 'fetchFileContents').mockResolvedValueOnce(mockFileContent);

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(screen.getByText('File 1.txt')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('File 1.txt'));

    await waitFor(() => {
      expect(screen.getByText('Volver a la lista')).toBeInTheDocument();
      expect(screen.getByText('Contenido del Archivo:')).toBeInTheDocument();
      expect(screen.getByText(mockFileContent)).toBeInTheDocument();
    });
    expect(TranscriptionListService.fetchFileContents).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'file1', name: 'File 1.txt', mimeType: 'text/plain' }),
      userId
    );
    expect(NotificationSystem.showNotification).toHaveBeenCalledWith('Archivo "File 1.txt" cargado correctamente.', 'success');

  });

  it('should show loading indicator when fetching file content', async () => {
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockResolvedValueOnce(mockRootItems);
    vi.spyOn(TranscriptionListService, 'fetchFileContents').mockImplementationOnce(() => new Promise(resolve => setTimeout(() => resolve('Test content'), 100)));

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(screen.getByText('File 1.txt')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('File 1.txt'));

    expect(screen.getByText(/Cargando contenido del archivo.../i)).toBeInTheDocument();
  });

  it('should display error message if fetching file content fails', async () => {
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockResolvedValueOnce(mockRootItems); 
    vi.spyOn(TranscriptionListService, 'fetchFileContents').mockRejectedValueOnce(new Error('File content API error'));

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(screen.getByText('File 1.txt')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('File 1.txt'));

    await waitFor(() => {
      expect(NotificationSystem.showNotification).toHaveBeenCalledWith('No se pudo cargar el contenido del archivo.', 'error');
      expect(screen.getByText('No se pudo cargar el contenido del archivo.')).toBeInTheDocument();
    });
  });

  it('should clear selected file content and return to list view', async () => {
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockResolvedValueOnce(mockRootItems); 
    vi.spyOn(TranscriptionListService, 'fetchFileContents').mockResolvedValueOnce('Contenido del archivo de prueba.');

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(screen.getByText('File 1.txt')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('File 1.txt'));

    await waitFor(() => {
      expect(screen.getByText('Volver a la lista')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Volver a la lista'));

    await waitFor(() => {
      expect(screen.getByText('Folder 1')).toBeInTheDocument();
      expect(screen.queryByText('Contenido del Archivo:')).not.toBeInTheDocument();
    });
  });

  it('should display error notification if fetching root fails', async () => {
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockRejectedValueOnce(new Error('API error'));

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(NotificationSystem.showNotification).toHaveBeenCalledWith('No se pudieron cargar los archivos de Google Drive.', 'error');
    });
    expect(screen.queryByText('Folder 1')).not.toBeInTheDocument();
  });

  it('should display error notification if navigating to subfolder fails', async () => {
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockResolvedValueOnce(mockRootItems); 
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockRejectedValueOnce(new Error('Folder API error')); 

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(screen.getByText('Folder 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Folder 1'));

    await waitFor(() => {
      expect(NotificationSystem.showNotification).toHaveBeenCalledWith('No se pudo navegar a la carpeta.', 'error');
    });
    expect(screen.queryByText('Subfile 1.doc')).not.toBeInTheDocument();
    expect(screen.getByText('Folder 1')).toBeInTheDocument();
  });

  it('should hide "Volver" button when at root folder', async () => {
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockResolvedValueOnce(mockRootItems);

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(screen.getByText('Folder 1')).toBeInTheDocument();
    });

    expect(screen.queryByText('Volver a la carpeta anterior')).not.toBeInTheDocument();
  });

  it('should show "Volver" button when navigated to a subfolder', async () => {
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockResolvedValueOnce(mockRootItems); 
    vi.spyOn(TranscriptionListService, 'fetchFolderContents').mockResolvedValueOnce(mockSubfolderItems); 

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(screen.getByText('Folder 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Folder 1'));

    await waitFor(() => {
      expect(screen.getByText('Subfile 1.doc')).toBeInTheDocument();
      expect(screen.getByText('Volver a la carpeta anterior')).toBeInTheDocument();
    });
  });
});
