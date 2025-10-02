import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import AIChat from '../AIChat';

describe('AIChat', () => {
  test('renders correctly with no document content', () => {
    render(<AIChat documentContent={null} />);
    expect(screen.getByText('Chat con IA')).toBeInTheDocument();
    expect(screen.getByText('Selecciona un documento para iniciar el chat con IA.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escribe tu pregunta aquí...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  test('renders correctly with document content', () => {
    const mockDocumentContent = "Este es un ejemplo de contenido de un documento muy largo para probar el chat de IA.";
    render(<AIChat documentContent={mockDocumentContent} />);
    expect(screen.getByText('Chat con IA')).toBeInTheDocument();
    expect(screen.getByText(/Contenido del documento cargado:/)).toBeInTheDocument();
    expect(screen.getByText(/Este es un ejemplo de contenido de un documento muy largo para probar el chat de IA.../)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escribe tu pregunta aquí...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });
});
