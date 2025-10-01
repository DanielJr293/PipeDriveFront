import { Folder, File } from "lucide-react";

function FileOrFolder({ id, name, mimeType, onItemClick }) {
  const isFolder = mimeType.includes("folder");

  const handleClick = () => {
    onItemClick(id, name, mimeType);
  };

  return (
    <div className="btnArchivo" onClick={handleClick}>
      <div className="divBtnArch">
        {isFolder ? <Folder size={20} /> : <File size={20} />}
      </div>
      <div className="divBtnArchText">
        <span>{name}</span>
      </div>
    </div>
  );
}

export default FileOrFolder;
