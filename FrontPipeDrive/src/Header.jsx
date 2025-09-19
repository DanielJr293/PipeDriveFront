/**
 * Componente De La Parte Superior En Donde Esta El Boton De Buscar y El Boton De Historial.
 */
import { Search, History } from "lucide-react";

function mensajes(){
  alert("Hola Mundo");
}

export default function Header() {
  return (
    <div className="divHeader">
      <div className="divTranscrip">
        <h1>Transcripciones</h1>
      </div>
      <div className="divButtons1">
        <div className="divSearch1">
          <div className="divSearchInput">
            <input type="text" placeholder="Buscar"/>
          </div>
          <div className="divSearch">
            <button>
              <div className="divImgBtn1">
                <Search/>
              </div>
              <div className="divInfBtn1">
                Buscar
              </div>
            </button>
          </div>
        </div>
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