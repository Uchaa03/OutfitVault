import { useRef } from 'react';
import { useUploadContext } from '../../contexts/UploadContext.jsx';

const UploadLayout = () => {
  const { active } = useUploadContext();
  const isActive = active ? 'active' : 'inactive';
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null); // Reference for the drop area

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

  // Drag and drop handlers
  const handleDragOver = (event) => {
    event.preventDefault(); // Necessary to allow dropping
    dropZoneRef.current.classList.add('dragging'); // Optional: Add visual feedback for dragging
  };

  const handleDragLeave = () => {
    dropZoneRef.current.classList.remove('dragging'); // Remove visual feedback when dragging leaves
  };

  const handleDrop = (event) => {
    event.preventDefault(); // Prevent default behavior (e.g., opening the file)
    dropZoneRef.current.classList.remove('dragging');
    const file = event.dataTransfer.files[0]; // Get the first file dropped
    if (file) {
      console.log('Dropped file:', file.name);
      // Handle the file here (e.g., upload it, display preview, etc.)
    }
  };

  return (
    <section
      className={`upload__region ${isActive}`}
      aria-labelledby="upload-section-heading"
      ref={dropZoneRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h1>Sube o arrastra una imagen de tu prenda para agregarla</h1>
      <p>Selecciona o arrastra un archivo de tu explorador</p>
      <img src="/assets/img/upload_icon.svg" alt="upload" className={'upload__region__img'}/>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the input, it will be triggered by the button
      />

      {/* Optional: Add some style feedback for drag-and-drop */}
      <div className="upload__drag-feedback">
        <p>Arrastra un archivo aquí</p>
      </div>

      <button onClick={handleUploadClick}>Browse</button>
    </section>
  );
};

export default UploadLayout;
