/**
 * Importación De Las Librerias Necesarias.
 */
import { useEffect, useRef, useState } from "react";
import { MoreVertical, Smile, Frown, Meh, Folder, File, BookText, Bold, Key, ArrowLeft} from "lucide-react";
import { showNotification } from "./NotificationSystem";
import FileOrFolder from "./FileOrFolder";

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
 * @param {string} userId - El ID del usuario actual.
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
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [fileContentError, setFileContentError] = useState(null);

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
   * Si es un archivo, obtiene su contenido, actualiza los estados de visualización de archivo y gestiona notificaciones.
   * @param {object} item - El archivo o carpeta en el que se hizo clic.
   */
  const handleItemClick = async (id, name, mimeType) => {
    if (mimeType.includes("folder")) {
      setIsLoading(true);
      setError(null);
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
      await fetchDriveItems(previousFolderId);
      showNotification("Volviendo a la carpeta anterior.", 'info');
    } else {
      showNotification("Ya estás en la raíz de Google Drive.", 'info');
    }
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
   * Maneja el resumen de una llamada a partir del contenido de un archivo seleccionado.
   * Envía el ID y el contenido del archivo a una API de agente para su procesamiento.
   * Muestra notificaciones de advertencia si no hay un archivo seleccionado.
   */
  async function handleCallSummary() {
    if (!selectedFileContent || !selectedFileId) {
      showNotification("No hay archivo seleccionado para resumir.", 'warning');
      return;
    }
    console.log("Datos", selectedFileId, selectedFileContent); // TODO: Eliminar console.log en producción.
    const idDealEnv = new URLSearchParams(window.location.search).get("idDeal");
    const WEBHOOK = getWebhookAgent();
    const peti = await fetch(`${WEBHOOK}/agent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: `Realiza El Resumen De La Llamada De Esto ${selectedFileContent}`, idDeal: idDealEnv, userId: userId}),
    });
    const resp = await peti.json();
    console.log(resp); // TODO: Eliminar console.log en producción.
  }
  
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
        <div className="primerasFunciones">
          <button className="divFunc1" onClick={handleCallSummary}>
            <div className="divFunc1Icono">
              <BookText size={40}/>
            </div>
            <div className="divFunc1Texto">
              <h1>Resumen De La Llamadas</h1>
              <h4>Obtener Un Resumen De La Transcripción</h4>
            </div>
          </button>
          <div className="divFunc1">
            Hola 2
          </div>
        </div>
        <button
          onClick={() => {
            setSelectedFileId(null);
            setSelectedFileContent(null);
            setIsContentLoaded(false);
            setFileContentError(null);
          }}
          className="buttonReturn"
        >
          Volver a la lista
        </button>
        {fileContentError && <div className="error-message">{fileContentError}</div>}
        {selectedFileContent && (
          <div className="file-content-display">
            <h2>Contenido del Archivo:</h2>
            <pre>{selectedFileContent}</pre>
          </div>
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