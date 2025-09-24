/**
 * Importación De Las Librerias Necesarias.
 */
import { useEffect, useRef, useState } from "react";
import { MoreVertical, Smile, Frown, Meh, Folder, File, BookText, Bold, Key} from "lucide-react";

/**
 * Creación De Nuestra Función Asyncrona, Para Poder Consultar Los Archivos Que Contiene Una Carpeta, De Google
 * Drive.
 * @param {"id": "IdDelFolder","mimeType": "TipoDeArchivo", "name": "NombreDeLaCarpeta"} 
 * @returns Todos Los Archivos Que Contenga La Carpeta.
 */
async function archivosFolders(item){
  const WEBHOOK = import.meta.env.VITE_URL_NGROK;                 // Importación De Nuestra Variable De Entorno.
  const params = new URLSearchParams(window.location.search);     // Obteniendo Los Parametros De La URL.
  const id = params.get("userId");                                // Obteniendo El UserID Del Usuario.
  /**
   * Realizando Nuestra Petición A Nuestra API, Para Poder Obtener Esos Datos.
   */
  const resp = await fetch(`${WEBHOOK}/DriveFolderArch`, {  
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: id, folderId: item.id }),    // Enviamos Nuestro UserId y El Id Del Folder.
  });
  const data = await resp.json();                               // Obteniedo La Respuesta De La Promesa.
  const archivos = data.GoogleDrive.files;                      // Guardando En Una Variable Lo Que Nos Importa, Nuestros Objetos
  return archivos;                                              // Retornando Los Datos, Los Archivos Del Folder.
}

/**
 * Realizando La Petición A Nuestra API, Para Ver El Contendio Del Archivo.
 * @param {"id": idDelArchivo", "mimeType": "TipoDeArhivo", "name": "NombreDelArchivo"} item 
 * @returns El Contenido Del Archivo.
 */
async function contenidoArch(item) {
  const WEBHOOK = import.meta.env.VITE_URL_NGROK;               // Importación De Nuestra Variable De Entorno.
  const params = new URLSearchParams(window.location.search);   // Obteniendo Los Parametros De La URL.
  const id = params.get("userId");                              // Obteniendo El UserID Del Usuario.
  /**
   * Realizando Nuestra Petición A Nuestra API, Para Poder Obtener Esos Datos.
   */
  const resp = await fetch(`${WEBHOOK}/DriveInfoArch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: id, fieldId: item.id }),     // Enviamos Nuestro UserId y El Id Del Folder.
  });
  const data = await resp.json();                               // Obteniedo La Respuesta De La Promesa.
  const Contenido = data.GoogleDrive;                           // Guardando En Una Variable Lo Que Nos Importa, Nuestros Objetos
  return Contenido;                                             // Retornando Los Datos, Los Archivos Del Folder.
}

/**
 * Creación De Nuestro Componente, Para Listear Nuestros Archivos.
 */
function FileOrFolder({ item, setItems, setSelectedFile }) {
  const isFolder = item.mimeType.includes("folder");        // Variable Para Saber Si Un Archivo Es Una Carpeta.

  /**
   * Creando Una Función En Para El Button, Para Saber Si Es Un Archivo o Una Carpeta.
   */
  const handleClick = async () => {
    /**
     * De Ser True, Es Que Es Una Carpeta.
     */
    if (isFolder) {
      const datesArchivos = await archivosFolders(item);    // Obteniedo Los Datos Que Contiene Nuestra Carpeta.
      setItems(datesArchivos);                              // Colocando Un Nuevo Valor A items Para Volver A Renderizar.
    } 
    /**
     * De No Ser Una Carpeta, Sera Un Archivo.
     */
    else {
      const contArch = await contenidoArch(item);           // Obteniendo Lo Que Contiene El Archivo.
      /**
       * Usando La Función Para Actualizar El Estado De Nuestra Variable De selectedFile Que Es Del Componente
       * TranscriptionList.
       * Haciendo Uso De spread operator Para Poder Devolver El Mismo Objeto Con Uno Extra,
       * Esto Desglosa El Archivo y Anexa Contenido: "Datos".
       */
      setSelectedFile({ ...item, Contenido: contArch});
    }
  };

  /**
   * Retornando Nuestros Datos Para Poder Seleccionar Seleccionar Un Archivo o Carpeta.
   */
  return (
    /**
     * Colocando La Función A Nuestro Objeto.
     */
    <button className="btnArchivo" onClick={handleClick}>
      <div className="divBtnArch">
        {
          /**
           * Dependiendo Si Es Folder o No Colocara Un Icono Diferente.
           */
        }
        {isFolder ? <Folder size={28} /> : <File size={28} />}
      </div>
      <div className="divBtnArchText">{item.name}</div>
    </button>
  );
}

/**
 * 
 * Creación De Nuestro Componente, Que Retorna Lo Que Se Muestra.
 */
function TranscriptionList() {
  const ejecutado = useRef(false);                          // Variable Para Que Solo Se Ejecute Una Vez Nuestra Petición.
  const [items, setItems] = useState([]);                   // Variable Para Los Datos Que Retorna Nuestra API, Que Son Los Archivos De Google Drive.
  /**
   * Variable Para Poder Colocar o No Los Botones De Las Funciones Para El Documento, 
   * Solo Se Colocan Si El item Es Un Documento, Esto Se Define Desde FileOrDolder.
   */
  const [selectedFile, setSelectedFile] = useState(null);

  /**
   * Función Para Obtener Los Datos De La Raiz De Google Drive "/".
   */
  const fetchFolders = async () => {
    // Variable Para Que Solo Se Ejecute Una Vez.
    if (!ejecutado.current) {
      const WEBHOOK = import.meta.env.VITE_URL_NGROK;               // Cargando Una Variable De Entorno.
      const params = new URLSearchParams(window.location.search);   // Obteniendo Los Datos Enviados Desde La URL.
      const id = params.get("userId");                              // Obteniendo El ID Del Usuario.

      ejecutado.current = true;                                     // Cambiando Nuestra Variable A True.

      /**
       * Realizando La Petición A La API, Para Poder Obtener Los Archivos De La
       * Raiz De Nuestro Google Drive "/"
       */
      const peti = await fetch(`${WEBHOOK}/DriveRoot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id }),                     // Enviando Solo Nuestros UserID.
      });
      const resp = await peti.json();                             // Obteniendo La Respuesta o Promesa De La Petición
      const dates = resp.GoogleDrive.files;                       // Guardando En Una Variable El Objeto.
      setItems(dates);                                            // Actualizando El Item Para Volver A Renderizar.
    }
  };

  /**
   * Haciendo uso De useEffect Para Que La Función Solo Funcione Al Cargar El Componente o La URL.
   */
  useEffect(() => {
    fetchFolders();     // Haciendo Uso De Nuestra Función.
  }, []);

  /**
   * Verificando Que La Variable Ya No Sea Nulo, Para Poder Usarla y Colocar Las Funciones (Botones). 
   * 
   * <h2>Archivo seleccionado: {selectedFile.name}</h2>
        <p>{selectedFile.Contenido}</p>

        {/* Ejemplo: abrir en visor de Google Docs }

        <button
          onClick={() => setSelectedFile(null)}
          style={{ marginTop: "10px" }}
        >
          Volver a la lista
        </button>
   * */  
  if (selectedFile) {
    return (
      <div className="divFunciones">
        <div className="primerasFunciones">
          <button className="divFunc1">
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
      </div>
    );
  }

  /**
   * De No Existir Nada En selectedFile, Retornamos Carpetas o Archivos
   */
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "80%",
        overflow: "auto",
      }}
    >
      {items.map((item) => (
        <FileOrFolder
          key={item.id}
          item={item}
          setItems={setItems}
          setSelectedFile={setSelectedFile}
        />
      ))}
    </div>
  );
}

export default TranscriptionList;