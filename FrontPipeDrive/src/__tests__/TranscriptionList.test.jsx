import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TranscriptionList from '../TranscriptionList'; // Adjust the path as necessary

// Mock de las funciones asíncronas
jest.mock('../../src/TranscriptionList', () => ({
  __esModule: true,
  ...jest.requireActual('../../src/TranscriptionList'),
  fetchFolderContents: jest.fn(),
  fetchFileContents: jest.fn(),
}));

// Mock del módulo de notificaciones
jest.mock('../NotificationSystem', () => ({
  showNotification: jest.fn(),
}));

const mockFetchFolderContents = require('../../src/TranscriptionList').fetchFolderContents;
const mockFetchFileContents = require('../../src/TranscriptionList').fetchFileContents;
const { showNotification } = require('../NotificationSystem');

describe('TranscriptionList', () => {
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
    // Resetear mocks antes de cada prueba
    mockFetchFolderContents.mockClear();
    mockFetchFileContents.mockClear();
    showNotification.mockClear();

    // Mockear la URL para que siempre tenga un userId
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
    mockFetchFolderContents.mockResolvedValueOnce(mockRootItems);

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(screen.getByText('Folder 1')).toBeInTheDocument();
      expect(screen.getByText('File 1.txt')).toBeInTheDocument();
    });

    expect(mockFetchFolderContents).toHaveBeenCalledWith({ id: 'root' }, userId);
    expect(showNotification).toHaveBeenCalledWith('Archivos cargados correctamente.', 'success');
  });

  it('should navigate to a subfolder on folder click', async () => {
    mockFetchFolderContents.mockResolvedValueOnce(mockRootItems); 
    mockFetchFolderContents.mockResolvedValueOnce(mockSubfolderItems); 

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(screen.getByText('Folder 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Folder 1'));

    await waitFor(() => {
      expect(screen.getByText('Subfile 1.doc')).toBeInTheDocument();
    });

    expect(mockFetchFolderContents).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'folder1', mimeType: 'application/vnd.google-apps.folder' }),
      userId
    );
    expect(showNotification).toHaveBeenCalledWith('Carpeta "Folder 1" cargada correctamente.', 'success');
  });

  it('should handle back navigation', async () => {
    mockFetchFolderContents.mockResolvedValueOnce(mockRootItems); 
    mockFetchFolderContents.mockResolvedValueOnce(mockSubfolderItems); 
    mockFetchFolderContents.mockResolvedValueOnce(mockRootItems); 

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
    expect(showNotification).toHaveBeenCalledWith('Volviendo a la carpeta anterior.', 'info');
  });

  it('should display file content on file click and update states', async () => {
    mockFetchFolderContents.mockResolvedValueOnce(mockRootItems); 
    const mockFileContent = 'Contenido del archivo de prueba.';
    mockFetchFileContents.mockResolvedValueOnce(mockFileContent);

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
    expect(mockFetchFileContents).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'file1', name: 'File 1.txt', mimeType: 'text/plain' }),
      userId
    );
    expect(showNotification).toHaveBeenCalledWith('Archivo "File 1.txt" cargado correctamente.', 'success');

    // Verify states are updated (implicitly through rendering, but can add direct checks if component exposes them)
    // Since we don't have direct access to component state in tests, we verify via rendered output.
  });

  it('should show loading indicator when fetching file content', async () => {
    mockFetchFolderContents.mockResolvedValueOnce(mockRootItems);
    mockFetchFileContents.mockImplementationOnce(() => new Promise(resolve => setTimeout(() => resolve('Test content'), 100)));

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(screen.getByText('File 1.txt')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('File 1.txt'));

    expect(screen.getByText(/Cargando contenido del archivo.../i)).toBeInTheDocument();
  });

  it('should display error message if fetching file content fails', async () => {
    mockFetchFolderContents.mockResolvedValueOnce(mockRootItems); 
    mockFetchFileContents.mockRejectedValueOnce(new Error('File content API error'));

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(screen.getByText('File 1.txt')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('File 1.txt'));

    await waitFor(() => {
      expect(showNotification).toHaveBeenCalledWith('No se pudo cargar el contenido del archivo.', 'error');
      expect(screen.getByText('No se pudo cargar el contenido del archivo.')).toBeInTheDocument(); // Assuming the error is rendered
    });
    // The view should remain on the file content view, but with an error.
    expect(screen.queryByText('Folder 1')).not.toBeInTheDocument(); // Not showing folder list
    expect(screen.getByText('Volver a la lista')).toBeInTheDocument(); // Still in file view
  });

  it('should clear selected file content and return to list view', async () => {
    mockFetchFolderContents.mockResolvedValueOnce(mockRootItems); 
    mockFetchFileContents.mockResolvedValueOnce('Contenido del archivo de prueba.');

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
    mockFetchFolderContents.mockRejectedValueOnce(new Error('API error'));

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(showNotification).toHaveBeenCalledWith('No se pudieron cargar los archivos de Google Drive.', 'error');
    });
    expect(screen.queryByText('Folder 1')).not.toBeInTheDocument();
  });

  it('should display error notification if navigating to subfolder fails', async () => {
    mockFetchFolderContents.mockResolvedValueOnce(mockRootItems); 
    mockFetchFolderContents.mockRejectedValueOnce(new Error('Folder API error')); 

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(screen.getByText('Folder 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Folder 1'));

    await waitFor(() => {
      expect(showNotification).toHaveBeenCalledWith('No se pudo navegar a la carpeta.', 'error');
    });
    expect(screen.queryByText('Subfile 1.doc')).not.toBeInTheDocument();
    expect(screen.getByText('Folder 1')).toBeInTheDocument();
  });

  it('should hide "Volver" button when at root folder', async () => {
    mockFetchFolderContents.mockResolvedValueOnce(mockRootItems);

    render(<TranscriptionList userId={userId} />);

    await waitFor(() => {
      expect(screen.getByText('Folder 1')).toBeInTheDocument();
    });

    expect(screen.queryByText('Volver a la carpeta anterior')).not.toBeInTheDocument();
  });

  it('should show "Volver" button when navigated to a subfolder', async () => {
    mockFetchFolderContents.mockResolvedValueOnce(mockRootItems); 
    mockFetchFolderContents.mockResolvedValueOnce(mockSubfolderItems); 

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
