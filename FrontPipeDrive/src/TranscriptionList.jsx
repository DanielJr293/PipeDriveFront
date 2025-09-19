/**
 * Importación De Las Librerias Necesarias.
 */
import { useEffect, useRef, useState } from "react";
import { MoreVertical, Smile, Frown, Meh, Folder, File, Bold, Key} from "lucide-react";

async function archivosFolders(item){
  const WEBHOOK = import.meta.env.VITE_URL_NGROK;
  const params = new URLSearchParams(window.location.search);
  const id = params.get("userId");
  const resp = await fetch(`${WEBHOOK}/DriveFolderArch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: id, folderId: item.id }),
  });
  const data = await resp.json();
  const archivos = data.GoogleDrive.files;
  return archivos;
}

// FileOrFolder.jsx
function FileOrFolder({ item, setItems }) {
  const [loading, setLoading] = useState(false);
  return (
    <button className="btnArchivo" onClick={ async () => {
      if(item.mimeType.includes('folder')){
        alert("El Id Es: " + item.id);
        const datesArchivos = await archivosFolders(item);
        console.log("Datos: ", datesArchivos);
        setItems(datesArchivos)  
      }
      else{
        alert("Es Un Archivo ID: " + item.id);
        const WEBHOOK = import.meta.env.VITE_URL_NGROK;
        const params = new URLSearchParams(window.location.search);
        const id = params.get("userId");
        const resp = await fetch(`${WEBHOOK}/DriveInfoArch`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: id, fieldId: item.id }),
        });
        const data = await resp.json();
        console.log(item.id);
        console.log(data);
        console.log(data.GoogleDrive);
      }
    }}>
      <div className="divBtnArch">
        {item.mimeType.includes('folder') ? <Folder size={28}/> : <File size={28}/>}</div>
      <div className="divBtnArchText">
        {item.name}</div>
    </button>
  );
}


export default function TranscriptionList() {
  /**
   *  Creación De Nuestra Variables.
   */
  const ejecutado = useRef(false);              // Usando useRef Para Que Solo Se Ejecute Una Vez Las Peticiones.
  const [items, setItems] = useState([]);       // Variable Donde Se Almacenara Las Carpetas.

  const fetchFolders = async () =>{
    if (!ejecutado.current) {
      const WEBHOOK = import.meta.env.VITE_URL_NGROK;
      const params = new URLSearchParams(window.location.search);
      const id = params.get("userId");
        
      ejecutado.current = true;
  
      // Realizando Nuestra Petición A Nuestra API.
      fetch(`${WEBHOOK}/DriveRoot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id, // Enviando La ID De Nuestro 
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        //console.log("Datos recibidos: ", data.GoogleDrive.files);
        const dates = data.GoogleDrive.files;
        //console.log(dates);
        dates.forEach(element => {
          console.log(element);
        });
        setItems(dates);
      })
      .catch((err) => console.error("Error:", err));
      }
  }

  useEffect(() => {
      fetchFolders();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center',
      maxHeight: '80%', overflow: 'auto'
    }}>
      {items.map(item => (
        <FileOrFolder key={item.id} item={item} setItems={setItems}/>
      ))
      }
    </div>
  );
}