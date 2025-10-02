import React from 'react';
import { BookText, Lightbulb, MessageSquare, ListTodo } from 'lucide-react';

/**
 * Componente DocActions:
 * Muestra botones de acción contextuales para documentos tipo .doc.
 * Estos botones permiten al usuario interactuar con funcionalidades de IA
 * relacionados con el contenido del documento, como generar resúmenes, propuestas, etc.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {function} props.onActionClick - Callback genérico para cualquier acción de documento.
 */
function DocActions({
  onActionClick,
}) {
  return (
    <div className="doc-actions-container">
      <button className="doc-action-button" onClick={() => onActionClick('summarize')}>
        <BookText size={24} />
        <span>Resumen de la Llamada</span>
      </button>
      <button className="doc-action-button" onClick={() => onActionClick('proposal')}>
        <Lightbulb size={24} />
        <span>Propuesta</span>
      </button>
      <button className="doc-action-button" onClick={() => onActionClick('questions')}>
        <MessageSquare size={24} />
        <span>Preguntas</span>
      </button>
      <button className="doc-action-button" onClick={() => onActionClick('actions')}>
        <ListTodo size={24} />
        <span>Acciones</span>
      </button>
    </div>
  );
}

export default DocActions;
