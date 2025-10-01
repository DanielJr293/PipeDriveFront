import { render, screen, fireEvent } from '@testing-library/react';
import FileOrFolder from '../FileOrFolder';
import { Folder, File } from 'lucide-react';
import '@testing-library/jest-dom';

describe('FileOrFolder', () => {
  const defaultProps = {
    id: '123',
    name: 'Test Item',
    onItemClick: jest.fn(),
  };

  beforeEach(() => {
    defaultProps.onItemClick.mockClear();
  });

  it('should render file details (id, name, mimeType) and call onItemClick with correct params', () => {
    render(<FileOrFolder {...defaultProps} mimeType="application/pdf" />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();

    const itemElement = screen.getByText('Test Item').closest('.btnArchivo');
    fireEvent.click(itemElement);
    expect(defaultProps.onItemClick).toHaveBeenCalledWith('123', 'Test Item', 'application/pdf');
  });

  it('should display folder icon for folder mimeTypes', () => {
    render(<FileOrFolder {...defaultProps} mimeType="application/vnd.google-apps.folder" />);
    const folderIcon = screen.getByTestId('folder-icon'); // Assuming Folder icon from lucide-react has data-testid="folder-icon"
    expect(folderIcon).toBeInTheDocument();
    expect(screen.queryByTestId('file-icon')).not.toBeInTheDocument();
  });

  it('should display file icon for file mimeTypes', () => {
    render(<FileOrFolder {...defaultProps} mimeType="application/pdf" />);
    const fileIcon = screen.getByTestId('file-icon'); // Assuming File icon from lucide-react has data-testid="file-icon"
    expect(fileIcon).toBeInTheDocument();
    expect(screen.queryByTestId('folder-icon')).not.toBeInTheDocument();
  });
});
