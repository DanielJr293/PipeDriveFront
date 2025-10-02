import { render, screen, fireEvent } from '@testing-library/react';
import DocActions from '../DocActions';
import { vi } from 'vitest';

describe('DocActions', () => {
  it('should render all action buttons correctly', () => {
    render(<DocActions onActionClick={() => {}} />); // onActionClick es ahora requerido
    expect(screen.getByText('Resumen de la Llamada')).toBeInTheDocument();
    expect(screen.getByText('Propuesta')).toBeInTheDocument();
    expect(screen.getByText('Preguntas')).toBeInTheDocument();
    expect(screen.getByText('Acciones')).toBeInTheDocument();
  });

  it('should call onActionClick with the correct actionType when a button is clicked', () => {
    const mockOnActionClick = vi.fn();
    render(<DocActions onActionClick={mockOnActionClick} />);

    fireEvent.click(screen.getByText('Resumen de la Llamada'));
    expect(mockOnActionClick).toHaveBeenCalledWith('summarize');

    fireEvent.click(screen.getByText('Propuesta'));
    expect(mockOnActionClick).toHaveBeenCalledWith('proposal');

    fireEvent.click(screen.getByText('Preguntas'));
    expect(mockOnActionClick).toHaveBeenCalledWith('questions');

    fireEvent.click(screen.getByText('Acciones'));
    expect(mockOnActionClick).toHaveBeenCalledWith('actions');

    expect(mockOnActionClick).toHaveBeenCalledTimes(4);
  });
});
