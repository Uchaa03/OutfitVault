import { useRef } from 'react';

const UploadLayout = () => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      // Handle the file here (e.g., upload it, display preview, etc.)
    }
  };

  return (
    
    <label htmlFor="file-upload" className={`upload__section`}>
      <h1>Sube o arrastra una imagen de tu prenda para agregarla</h1>
      <p>Selecciona para subir archivo de tu explorador</p>
      <img src="/assets/img/upload_icon.svg" alt="Icono de subida de imagen" />
      <button type="section__button">Browse</button>

      {/* Hidden file input */}
      <input
        id="file-upload"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the input, it will be triggered by the label
      />
    </label>
  );
};

export default UploadLayout;