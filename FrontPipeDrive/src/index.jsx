import Sidebar from "./Sidebar";
import Header from "./Header";
import Notificaciones from "./Notificaciones";
import TranscriptionList from "./TranscriptionList";
import Informes from "./Informes";
import "./App.css";
import { useState } from "react";

export default function Index({ isSidebarOpen, toggleSidebar, userId }) {
  const [activeComponent, setActiveComponent] = useState("drive");
  const [driveKey, setDriveKey] = useState(0); // 👈 clave para forzar remonte

  const handleSelect = (component) => {
    if (component === "drive") {
      // Incrementamos la key para forzar remontar TranscriptionList
      setDriveKey(prev => prev + 1);
    }
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "notifications":
        return <Notificaciones/>;
      case "drive":
        return <TranscriptionList key={driveKey} userId={userId}/>; // 👈 key dinámica
      case "informs":
        return <Informes/>;
      default:
        return <TranscriptionList key={driveKey} userId={userId}/>;
    }
  };

  return (
    <div className="Index">
        <div className={`BarraIzq ${isSidebarOpen ? 'open' : ''}`}>
            <Sidebar onSelectDates={handleSelect} isSidebarOpen={isSidebarOpen}/>
        </div>
        <div className="BarraDer">
            <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
            {renderComponent()}
        </div>
    </div>
  );
}
