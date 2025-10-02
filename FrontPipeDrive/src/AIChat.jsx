import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, FileText, ArrowLeft, Bot } from 'lucide-react'; // Añadir Bot para icono de IA
import { showNotification } from "./NotificationSystem"; // Asumiendo que NotificationSystem es accesible

// Obtiene la URL del webhook del agente desde las variables de entorno.
const getWebhookAgent = () => import.meta.env.VITE_URL_AGENT;

function AIChat({ documentContent, documentTitle, documentId, userId, onBackClick, initialAiResponse }) {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isSending, setIsSending] = useState(false); // Estado para el indicador de carga del input
  const chatAreaRef = useRef(null); // Referencia para el área de chat

  // Efecto para hacer scroll al final del chat cuando se añaden nuevos mensajes
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Mensaje inicial de bienvenida de la IA o respuesta inicial del Agente
  useEffect(() => {
    // Solo añadir el mensaje inicial si no hay mensajes en el chat y se tiene contenido o una respuesta inicial.
    // También manejar el caso en que initialAiResponse llega después del mensaje de bienvenida.
    if (chatMessages.length === 0 && (initialAiResponse || documentContent)) {
      if (initialAiResponse) {
        setChatMessages([
          { sender: 'ai', text: initialAiResponse }
        ]);
      } else if (documentContent) {
        setChatMessages([
          { sender: 'ai', text: 'Hola, ¿en qué puedo ayudarte hoy con esta transcripción?' }
        ]);
      }
    } else if (chatMessages.length === 1 && chatMessages[0].text === 'Hola, ¿en qué puedo ayudarte hoy con esta transcripción?' && initialAiResponse) {
      // Si ya está el mensaje de bienvenida, y luego llega initialAiResponse, reemplazarlo.
      setChatMessages([
        { sender: 'ai', text: initialAiResponse }
      ]);
    }
  }, [documentContent, initialAiResponse, chatMessages.length]);

  const handleSendMessage = async () => {
    if (message.trim() === '' || isSending) return;

    const userMessage = { text: message, sender: 'user' };
    setChatMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsSending(true); // Activar carga

    const WEBHOOK = getWebhookAgent();
    const idDealEnv = new URLSearchParams(window.location.search).get("idDeal"); // Obtener idDealEnv

    try {
      const response = await fetch(`${WEBHOOK}/agent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userMessage.text,
          idDeal: idDealEnv, // Asegúrate de que idDealEnv se pase correctamente
          userId: userId, // Asegúrate de que userId se pase correctamente
          documentId: documentId, // Pasar el ID del documento seleccionado
        }),
      });

      if (!response.ok) {
        throw new Error(`Error de la API: ${response.status}`);
      }

      const data = await response.json();
      console.log("Respuesta completa del Agente:", data); // Mantener este console.log para futuras depuraciones si es necesario
      const aiResponse = { text: data.respuesta || "No pude obtener una respuesta. Intenta de nuevo.", sender: 'ai' }; // Cambiado de data.response a data.respuesta
      setChatMessages((prev) => [...prev, aiResponse]);
      showNotification("Mensaje enviado y respuesta recibida.", 'success');
    } catch (error) {
      console.error("Error al enviar mensaje a la IA:", error);
      showNotification("Error al comunicarse con la IA.", 'error');
      setChatMessages((prev) => [...prev, { sender: 'ai', text: 'Lo siento, hubo un error al procesar tu solicitud.' }]);
    } finally {
      setIsSending(false); // Desactivar carga
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="ai-chat-main-container">
      {/* Encabezado del Chat */}
      <div className="ai-chat-header">
        <button onClick={onBackClick} className="ai-chat-back-button">
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Volver</span>
        </button>
        <h2 className="ai-chat-title">
          <MessageSquare size={20} /> {documentTitle || "Chat de IA"}
        </h2>
      </div>

      {/* Área de Mensajes del Chat */}
      <div ref={chatAreaRef} className="ai-chat-messages-area">
        {chatMessages.length === 0 && !documentContent && !initialAiResponse ? ( // Ajustado para contemplar initialAiResponse en la condición
          <p className="text-gray-500 italic text-center">Selecciona un documento para iniciar el chat con la IA.</p>
        ) : (
          chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`ai-chat-message-bubble ${msg.sender === 'user' ? 'ai-chat-message-user' : 'ai-chat-message-ai'}`}
              >
                {msg.sender === 'ai' && <Bot size={18} />}
                <span>{msg.text}</span>
              </div>
            </div>
          ))
        )}
        {isSending && (
          <div className="flex justify-start">
            <div className="ai-chat-typing-indicator">
              <Bot size={18} />
              <span>Escribiendo...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input del Chat */}
      <div className="ai-chat-input-area">
        <input
          type="text"
          className="ai-chat-input-field"
          placeholder={isSending ? "Enviando..." : "Escribe tu mensaje aquí..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isSending}
        />
        <button
          className="ai-chat-send-button"
          onClick={handleSendMessage}
          disabled={isSending || message.trim() === ''}
        >
          {isSending ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <Send size={20} />}
        </button>
      </div>
    </div>
  );
}

export default AIChat;