import { useRef } from 'react';
import { useUploadContext } from '../contexts/UploadContext.jsx';


const UploadLayout = () => {
  const { active } = useUploadContext();
  const isActive = active ? 'active' : 'inactive';
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger the file input when the button is clicked
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      // Handle the file here (e.g., upload it, display preview, etc.)
    }
  };

  return (
    <section className={`upload__section ${isActive}`}>
      <h1>Sube o arrastra una imagen de tu prenda para agregarla</h1>
      <p>Selecciona para subir archivo de tu explorador</p>
      <img src="/assets/img/upload_icon.svg" alt="upload" />

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the input, it will be triggered by the button
      />

      <button onClick={handleUploadClick}>Browse</button>
    </section>
  );
};

export default UploadLayout;
