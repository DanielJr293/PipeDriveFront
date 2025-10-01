import { Bell, Folder, FileText, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./App.css";

function Sidebar({onSelectDates, isSidebarOpen}) {      
  const [correo, setCorreo] = useState(null);
  const ejecutado = useRef(false);              // Usando useRef Para Que Solo Se Ejecute Una Vez Las Peticiones.

  /**
   * Uso De useEffect, Para Que Se Ejecute Solo Cuando Se Cargue La Pagina, Se Puede Usar Tambien
   * Si Es Que Una Variable Cambia
   */
  useEffect(() => {
    if (!ejecutado.current) {
      const WEBHOOK = import.meta.env.VITE_URL_NGROK;
      const params = new URLSearchParams(window.location.search);
      const id = params.get("userId");
      
      ejecutado.current = true;

      // Realizando Nuestra Petición A Nuestra API.
      fetch(`${WEBHOOK}/usuario`, {
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
        //console.log("Datos recibidos: ", data);
        setCorreo(data.usuario.correo);
      })
      .catch((err) => console.error("Error:", err));
    }
  }, []);

  return (
    <div className={`Sidebar ${!isSidebarOpen ? 'hidden' : ''}`}>
      {/**
       * Div En Donde Se Coloca Lean Sales, Lo Dejo Por Si Existe Algun Icono.
       */}
      <div className="divLogo">
        <h2>Lean Sales</h2>
      </div>
      {/**
       * Div En Donde Esta La Barra De Navegación.
       */}
      <div className="divBarra">
        <div className="divUser">
          {/**
           * Colocando El Correo Aquí.
           */}
          {correo}
        </div>
        <div className="divButtons">
          <div className="divBtn1">
            <button onClick={() => onSelectDates("notifications")}>
              <div className="divImgBtn1">
                <Bell/>
              </div>
              <div className="divInfBtn1">
                Notificaciones
              </div>
            </button>
          </div>
          <div className="divBtn1">
            <button onClick={() => onSelectDates("drive")}>
              <div className="divImgBtn1">
                <Folder/>
              </div>
              <div className="divInfBtn1">
                Google Drive
              </div>
            </button>
          </div>
          <div className="divBtn1">
            <button onClick={() => onSelectDates("informs")}>
              <div className="divImgBtn1">
                <FileText/>
              </div>
              <div className="divInfBtn1">
                Informes
              </div>
            </button>
          </div>
        </div>
      </div>
      {/**
       * Div En Donde Esta El Botón Para Cerrar Sección.
       */}
      
    </div>
  );
}

export default Sidebar;