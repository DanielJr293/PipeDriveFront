import React from 'react';
import { BookText, Lightbulb, MessageSquare, ListTodo } from 'lucide-react';

/**
 * Componente DocActions:
 * Muestra botones de acción contextuales para documentos tipo .doc.
 * Estos botones permiten al usuario interactuar con funcionalidades de IA
 * relacionadas con el contenido del documento, como generar resúmenes, propuestas, etc.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {function} props.onSummarizeClick - Callback para el botón 'Resumen de la Llamada'.
 * @param {function} props.onProposalClick - Callback para el botón 'Propuesta'.
 * @param {function} props.onQuestionsClick - Callback para el botón 'Preguntas'.
 * @param {function} props.onActionsClick - Callback para el botón 'Acciones'.
 */
function DocActions({
  onSummarizeClick,
  onProposalClick,
  onQuestionsClick,
  onActionsClick,
}) {
  return (
    <div className="doc-actions-container">
      <button className="doc-action-button" onClick={onSummarizeClick}>
        <BookText size={24} />
        <span>Resumen de la Llamada</span>
      </button>
      <button className="doc-action-button" onClick={onProposalClick}>
        <Lightbulb size={24} />
        <span>Propuesta</span>
      </button>
      <button className="doc-action-button" onClick={onQuestionsClick}>
        <MessageSquare size={24} />
        <span>Preguntas</span>
      </button>
      <button className="doc-action-button" onClick={onActionsClick}>
        <ListTodo size={24} />
        <span>Acciones</span>
      </button>
    </div>
  );
}

export default DocActions;
