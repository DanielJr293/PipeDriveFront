import Sidebar from "./Sidebar";
import Header from "./Header";
import Notificaciones from "./Notificaciones";
import TranscriptionList from "./TranscriptionList";
import Informes from "./Informes";
import "./App.css";
import { useState } from "react";

export default function Index() {
  const [activeComponent, setActiveComponent] = useState("drive");

  // Renderizado condicional
  const renderComponent = () => {
    switch (activeComponent) {
      case "notifications":
        return <Notificaciones/>;
      case "drive":
        return <TranscriptionList/>;
      case "informs":
        return <Informes/>;
      default:
        return <TranscriptionList />;
    }
  };

  return (
    <div className="Index">
        <div className="BarraIzq">
            <Sidebar onSelectDates={setActiveComponent}/>
        </div>
        <div className="BarraDer">
            <Header />
            {renderComponent()}
        </div>
    </div>
  );
}