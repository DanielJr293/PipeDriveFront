import { render, screen, fireEvent } from '@testing-library/react';
import DocActions from '../DocActions';
import { vi } from 'vitest';

describe('DocActions', () => {
  it('should render all action buttons correctly', () => {
    render(<DocActions />);
    expect(screen.getByText('Resumen de la Llamada')).toBeInTheDocument();
    expect(screen.getByText('Propuesta')).toBeInTheDocument();
    expect(screen.getByText('Preguntas')).toBeInTheDocument();
    expect(screen.getByText('Acciones')).toBeInTheDocument();
  });

  it('should call onSummarizeClick when "Resumen de la Llamada" button is clicked', () => {
    const mockOnSummarizeClick = vi.fn();
    render(<DocActions onSummarizeClick={mockOnSummarizeClick} />);
    fireEvent.click(screen.getByText('Resumen de la Llamada'));
    expect(mockOnSummarizeClick).toHaveBeenCalledTimes(1);
  });

  it('should call onProposalClick when "Propuesta" button is clicked', () => {
    const mockOnProposalClick = vi.fn();
    render(<DocActions onProposalClick={mockOnProposalClick} />);
    fireEvent.click(screen.getByText('Propuesta'));
    expect(mockOnProposalClick).toHaveBeenCalledTimes(1);
  });

  it('should call onQuestionsClick when "Preguntas" button is clicked', () => {
    const mockOnQuestionsClick = vi.fn();
    render(<DocActions onQuestionsClick={mockOnQuestionsClick} />);
    fireEvent.click(screen.getByText('Preguntas'));
    expect(mockOnQuestionsClick).toHaveBeenCalledTimes(1);
  });

  it('should call onActionsClick when "Acciones" button is clicked', () => {
    const mockOnActionsClick = vi.fn();
    render(<DocActions onActionsClick={mockOnActionsClick} />);
    fireEvent.click(screen.getByText('Acciones'));
    expect(mockOnActionsClick).toHaveBeenCalledTimes(1);
  });
});
