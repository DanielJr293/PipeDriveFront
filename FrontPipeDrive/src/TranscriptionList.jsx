/**
 * Importación De Las Librerias Necesarias.
 */
import { useEffect, useRef, useState } from "react";
import { MoreVertical, Smile, Frown, Meh, Folder, File, BookText, Bold, Key, ArrowLeft} from "lucide-react";
import { showNotification } from "./NotificationSystem";
import FileOrFolder from "./FileOrFolder";
import DocActions from "./DocActions";
import AIChat from "./AIChat";

/**
 * Obtiene la URL del webhook de NGROK desde las variables de entorno.
 */
const getWebhookNgrok = () => import.meta.env.VITE_URL_NGROK;

/**
 * Obtiene la URL del webhook del agente desde las variables de entorno.
 */
const getWebhookAgent = () => import.meta.env.VITE_URL_AGENT;

/**
 * Consulta los archivos que contiene una carpeta de Google Drive.
 * @param {object} item - Objeto con id, mimeType y name de la carpeta.
 * @param {string} userId - El ID del usuario actual.
 * @returns {Array} Una lista de archivos y carpetas dentro de la carpeta especificada.
 */
export async function fetchFolderContents(item, userId){
  const WEBHOOK = getWebhookNgrok();
  
  const resp = await fetch(`${WEBHOOK}/DriveFolderArch`, {  
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: userId, folderId: item.id }),
  });
  const data = await resp.json();
  const archivos = data.GoogleDrive.files;
  return archivos;
}

/**
 * Ve el contenido de un archivo.
 * @param {object} item - Objeto con id, mimeType y name del archivo.
 * @param {string} userId - El ID del usuario actual.\
 * @returns {string} El contenido del archivo.
 */
export async function fetchFileContents(item, userId) {
  const WEBHOOK = getWebhookNgrok();
  
  const resp = await fetch(`${WEBHOOK}/DriveInfoArch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: userId, fieldId: item.id }),
  });
  const data = await resp.json();
  const Contenido = data.GoogleDrive;
  //console.log(Contenido); // TODO: Eliminar console.log en producción.
  return Contenido;
}

/**
 * Componente principal que gestiona la visualización y navegación de archivos y carpetas de Google Drive.
 * Permite la navegación hacia adelante y hacia atrás, la selección de archivos y la interacción con un sistema de notificaciones.
 */
function TranscriptionList({ userId }) {
  const [driveItems, setDriveItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFolderId, setCurrentFolderId] = useState("root");
  const [folderHistory, setFolderHistory] = useState(["root"]);
  const [selectedFileContent, setSelectedFileContent] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null); // Nuevo estado para el nombre del archivo seleccionado
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [fileContentError, setFileContentError] = useState(null);
  const [isDocSelected, setIsDocSelected] = useState(false); // Estado para controlar la visibilidad del componente DocActions basado en si el archivo seleccionado es un documento .doc.
  const [isAIChatActive, setIsAIChatActive] = useState(false); // Estado para controlar la visibilidad del chat de IA.
  const [initialAiResponse, setInitialAiResponse] = useState(null); // Nuevo estado para almacenar la respuesta inicial de la IA
  const [isInitialAiResponseLoading, setIsInitialAiResponseLoading] = useState(false); // Nuevo estado para indicar si la respuesta inicial de la IA está cargando

  // MimeTypes específicos que corresponden a archivos de documentos (.doc, .docx, Google Docs).
  const docMimeTypes = [
    "application/vnd.google-apps.document",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  /**
   * Obtiene los contenidos de una carpeta específica (o la raíz) de Google Drive.
   * Actualiza el estado `driveItems` y gestiona los estados de carga y error, mostrando notificaciones.
   * @param {string} folderId - El ID de la carpeta a la que navegar. Usa "root" para la carpeta raíz.
   */
  const fetchDriveItems = async (folderId) => {
    setIsLoading(true);
    setError(null);
    const WEBHOOK = getWebhookNgrok();
    
    try {
      let url = `${WEBHOOK}/DriveRoot`;
      let body = { userId: userId };

      if (folderId !== "root") {
        url = `${WEBHOOK}/DriveFolderArch`;
        body = { userId: userId, folderId: folderId };
      }

      const peti = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!peti.ok) {
        throw new Error(`HTTP error! status: ${peti.status}`);
      }
      const resp = await peti.json();
      const items = resp.GoogleDrive.files;
      setDriveItems(items);
      showNotification("Archivos cargados correctamente.", 'success');
    } catch (err) {
      console.error("Error al obtener los archivos de Drive:", err);
      setError("No se pudieron cargar los archivos de Google Drive.");
      showNotification("No se pudieron cargar los archivos de Google Drive.", 'error');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Maneja el clic en un ítem (archivo o carpeta).
   * Si es una carpeta, navega a ella y actualiza el historial de navegación.
   * Si es un archivo, obtiene su contenido, actualiza los estados de visualización de archivo, gestiona notificaciones
   * y determina si el archivo es un documento para activar o desactivar DocActions.
   * @param {string} id - El ID del ítem (archivo o carpeta).
   * @param {string} name - El nombre del ítem.
   * @param {string} mimeType - El MIME type del ítem.
   */
  const handleItemClick = async (id, name, mimeType) => {
    if (mimeType.includes("folder")) {
      setIsLoading(true);
      setError(null);
      // Cuando se navega a una carpeta, se asume que no hay un .doc seleccionado.
      setIsDocSelected(false);
      setIsAIChatActive(false); // Asegurarse de que el chat se desactive al navegar a una carpeta
      setInitialAiResponse(null); // Limpiar la respuesta inicial de la IA
      setIsInitialAiResponseLoading(false); // Reiniciar estado de carga
      try {
        const datesArchivos = await fetchFolderContents({ id, name, mimeType }, userId);
        setDriveItems(datesArchivos);
        setCurrentFolderId(id);
        setFolderHistory((prevStack) => [...prevStack, id]);
        showNotification(`Carpeta "${name}" cargada correctamente.`, 'success');
      } catch (err) {
        console.error("Error al navegar a la carpeta:", err);
        setError("No se pudo navegar a la carpeta.");
        showNotification("No se pudo navegar a la carpeta.", 'error');
      } finally {
        setIsLoading(false);
      }
    } else {
      // This is a file, handle file content view
      setSelectedFileId(id);
      setIsContentLoaded(false);
      setFileContentError(null);
      setIsLoading(true);
      setIsAIChatActive(false); // Desactivar el chat de IA al seleccionar un nuevo archivo
      setInitialAiResponse(null); // Limpiar la respuesta inicial de la IA
      setIsInitialAiResponseLoading(false); // Reiniciar estado de carga

      // Determinar si el archivo seleccionado es un documento .doc y actualizar el estado isDocSelected.
      const isCurrentFileDoc = docMimeTypes.includes(mimeType);
      setIsDocSelected(isCurrentFileDoc);
      setSelectedFileName(name); // Guardar el nombre del archivo seleccionado

      try {
        const fileContents = await fetchFileContents({ id, name, mimeType }, userId);
        setSelectedFileContent(fileContents);
        setIsContentLoaded(true);
        showNotification(`Archivo "${name}" cargado correctamente.`, 'success');
      } catch (err) {
        console.error("Error al obtener el contenido del archivo:", err);
        setFileContentError("No se pudo cargar el contenido del archivo.");
        showNotification("No se pudo cargar el contenido del archivo.", 'error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  /**
   * Maneja el clic en el botón "Volver a la carpeta anterior".
   * Elimina la última carpeta del historial de navegación y carga el contenido de la carpeta anterior.
   * Si ya se está en la raíz, muestra una notificación informativa.
   */
  const handleBackClick = async () => {
    if (folderHistory.length > 1) {
      const newStack = folderHistory.slice(0, -1);
      const previousFolderId = newStack[newStack.length - 1];
      setFolderHistory(newStack);
      setCurrentFolderId(previousFolderId);
      setIsAIChatActive(false); // Desactivar el chat al volver a una carpeta anterior
      setInitialAiResponse(null); // Limpiar la respuesta inicial de la IA
      setIsInitialAiResponseLoading(false); // Reiniciar estado de carga
      await fetchDriveItems(previousFolderId);
      showNotification("Volviendo a la carpeta anterior.", 'info');
    } else {
      showNotification("Ya estás en la raíz de Google Drive.", 'info');
    }
  };

  /**
   * Maneja el clic en el botón "Volver" del chat de IA.
   * Reinicia los estados relacionados con el archivo seleccionado y el chat de IA.
   */
  const handleBackFromChatClick = () => {
    setSelectedFileId(null);
    setSelectedFileContent(null);
    setIsContentLoaded(false);
    setFileContentError(null);
    setIsAIChatActive(false);
    setSelectedFileName(null); // Limpiar el nombre del archivo seleccionado
    setInitialAiResponse(null); // Limpiar la respuesta inicial de la IA
    setIsInitialAiResponseLoading(false); // Reiniciar estado de carga
  };

  /**
   * Efecto que se ejecuta al montar el componente o cuando `currentFolderId` cambia.
   * Realiza la carga inicial de los ítems de Drive si no se ha manejado ya.
   */
  useEffect(() => {
    if (userId) {
      fetchDriveItems(currentFolderId);
    }
  }, [currentFolderId, userId]);

  /**
   * Maneja el clic en una acción de documento.
   * Activa el chat de IA y, si la acción es 'summarize', envía una solicitud a la API /agent.
   * @param {string} actionType - El tipo de acción que se ha hecho clic (e.g., 'summarize', 'proposal').
   */
  const handleDocActionClick = async (actionType) => {
    setIsAIChatActive(true); // Siempre activar el chat al hacer clic en una acción de documento
    console.log(`Acción de documento clicada: ${actionType}`); // TODO: Eliminar console.log en producción.

    if (actionType === 'summarize') {
      if (!selectedFileContent || !selectedFileId) {
        showNotification("No hay archivo seleccionado para resumir.", 'warning');
        return;
      }
      setIsLoading(true); // Activar el spinner de carga general
      setIsInitialAiResponseLoading(true); // Activar el spinner de carga inicial de la IA
      showNotification("Generando resumen de la llamada...", 'info');
      const idDealEnv = new URLSearchParams(window.location.search).get("idDeal");
      console.log(`idDealEnv: ${idDealEnv}`); // TODO: Eliminar console.log en producción.
      const WEBHOOK = getWebhookAgent();
      try {
        const peti = await fetch(`${WEBHOOK}/agent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: `Realiza El Resumen De La Llamada De Esto ${selectedFileContent}`, idDeal: idDealEnv, userId: userId}),
        });
        if (!peti.ok) {
          throw new Error(`Error al solicitar resumen: ${peti.status}`);
        }
        const resp = await peti.json();
        console.log(resp); // TODO: Eliminar console.log en producción.
        setInitialAiResponse(resp.respuesta); // Guardar la respuesta del Agente en el estado
        showNotification("Resumen de la llamada generado con éxito.", 'success');
      } catch (err) {
        console.error("Error al generar resumen:", err);
        showNotification("Error al generar el resumen de la llamada.", 'error');
      } finally {
        setIsLoading(false); // Desactivar el spinner de carga general
        setIsInitialAiResponseLoading(false); // Desactivar el spinner de carga inicial de la IA
      }
    } else {
        // Para otras acciones, simplemente activamos el chat de IA por ahora
        showNotification(`Funcionalidad '${actionType}' en desarrollo.`, 'info');
    }
  };

  if (isLoading && !isContentLoaded) {
    return (
      <div className="loading-message">
        <div className="spinner"></div>
        <p>Cargando {selectedFileId ? "contenido del archivo" : "archivos de Google Drive"}...</p>
      </div>
    );
  }

  if (selectedFileId && isContentLoaded) {
    return (
      <div className="divFunciones">
        {isAIChatActive ? (
          <AIChat
            documentContent={selectedFileContent}
            documentTitle={selectedFileName} // Pasar el nombre del archivo al chat
            documentId={selectedFileId} // Asegúrate de pasar el documentId
            userId={userId} // Asegúrate de pasar el userId
            onBackClick={handleBackFromChatClick} // Pasar la función para volver
            initialAiResponse={initialAiResponse} // Pasar la respuesta inicial de la IA
            isInitialAiResponseLoading={isInitialAiResponseLoading} // Pasar el estado de carga de la respuesta inicial
          />
        ) : (
          <>
            {isDocSelected && (
              <DocActions
                onActionClick={handleDocActionClick} // Usar handleDocActionClick para todas las acciones de DocActions
              />
            )}
            {fileContentError && <div className="error-message">{fileContentError}</div>}
            {selectedFileContent && (
              <div className="file-content-display">
                <h2>Contenido del Archivo:</h2>
                <pre>{selectedFileContent}</pre>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
  
  if (error) {
    return null;
  }

  /**
   * Renderiza la lista de archivos y carpetas de Google Drive.
   * Incluye un botón "Volver" condicionalmente visible si hay historial de navegación.
   * También muestra un mensaje si la carpeta actual está vacía y no hay errores ni carga.
   */
  return (
    <div className="divTranscriptionList">
      {folderHistory.length > 1 && (
        <button onClick={handleBackClick} className="back-button-style">
          <ArrowLeft size={20} />
          Volver a la carpeta anterior
        </button>
      )}
      {driveItems.length === 0 && !isLoading && !error && (
        <div className="empty-folder-message">
          <p>Esta carpeta no contiene archivos.</p>
        </div>
      )}
      {driveItems.map((item) => (
        <FileOrFolder
          key={item.id}
          id={item.id}
          name={item.name}
          mimeType={item.mimeType}
          onItemClick={handleItemClick}
        />
      ))}
    </div>
  );
}

export default TranscriptionList;