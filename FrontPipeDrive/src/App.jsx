/**
 * Parte Principal De La Pagina Web, En Donde Se Anexaran Todos Los Componentes.
 */
import Index from "./index";
import NotificationSystem from "./NotificationSystem"; // Importar NotificationSystem
import { useState, useEffect } from "react";

function App(){
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar la visibilidad de la barra lateral
  const [userId, setUserId] = useState(null); // Estado para almacenar el userId

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("userId");
    if (id) {
      setUserId(id);
    }
    if (isSidebarOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isSidebarOpen]);

  return (
    <>
      <Index isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} userId={userId}/>
      {isSidebarOpen && <div className="sidebar-backdrop" onClick={toggleSidebar}></div>}
      <NotificationSystem /> {/* Renderizar el sistema de notificaciones */}
    </>
  );
}

export default App;