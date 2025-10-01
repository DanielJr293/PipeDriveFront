import { Folder, File } from "lucide-react";

/**
 * Componente reutilizable para representar un archivo o una carpeta de Google Drive.
 * Muestra un icono y el nombre del ítem, y maneja el evento de clic.
 * @param {Object} props - Las props del componente.
 * @param {string} props.id - El ID único del archivo o carpeta.
 * @param {string} props.name - El nombre del archivo o carpeta.
 * @param {string} props.mimeType - El tipo MIME del archivo o carpeta (ej., "application/vnd.google-apps.folder" para carpetas).
 * @param {function(string, string, string): void} props.onItemClick - Función de callback que se invoca al hacer clic en el ítem, pasando id, name y mimeType.
 */
function FileOrFolder({ id, name, mimeType, onItemClick }) {
  const isFolder = mimeType.includes("folder");

  const handleClick = () => {
    onItemClick(id, name, mimeType);
  };

  return (
    <div className="btnArchivo" onClick={handleClick}>
      <div className="divBtnArch">
        {isFolder ? <Folder size={20} data-testid="folder-icon" /> : <File size={20} data-testid="file-icon" />}
      </div>
      <div className="divBtnArchText">
        <span>{name}</span>
      </div>
    </div>
  );
}

export default FileOrFolder;
