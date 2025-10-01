/**
 * Componente De La Parte Superior En Donde Esta El Boton De Buscar y El Boton De Historial.
 */
import { History, Menu } from "lucide-react";

function mensajes(){
  alert("Hola Mundo");
}

export default function Header({ toggleSidebar, isSidebarOpen }) {
  return (
    <div className="divHeader">
      <button onClick={toggleSidebar} className="sidebar-toggle-button">
        <Menu size={24} />
      </button>
      <div className="divTranscrip">
        <h1>Transcripciones</h1>
      </div>
      <div className="divButtons1">
        
        <div className="divHisto1">
          <button>
            <div className="divImgBtn1">
                <History/>
            </div>
            <div className="divInfBtn1">
              Historial
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}