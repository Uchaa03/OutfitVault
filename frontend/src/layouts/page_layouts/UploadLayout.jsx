import { useRef } from 'react';
import { useUploadContext } from '../../contexts/UploadContext.jsx';

/**
 * UploadLayout component provides a file upload section
 * where users can either click to select a file
 * or drag-and-drop a file into a specified area.
 *
 * @component
 * @example
 * return (* <UploadLayout /> *)
 */
const UploadLayout = () => {
  /**
   * The context that manages the active state of the upload section.
   * @type {object}
   * @property {boolean} active - Indicates whether the upload section is active or not.
   */
  const { active } = useUploadContext();
  const isActive = active ? 'active' : 'inactive';

  // Refs for file input and drop zone areas
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  /**
   * Handles the file input click event. It triggers the file input to open for file selection.
   * @function
   */
  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger the file input when the button is clicked
  };

  /**
   * Handles changes in the file input. When a file is selected, the file is logged to the console.
   * @function
   * @param {Event} event - The change event for the file input.
   */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      // Handle the file here (e.g., upload it, display preview, etc.)
    }
  };

  /**
   * Handles the drag over event when a file is dragged over the drop area.
   * Adds visual feedback for the dragging state.
   * @function
   * @param {Event} event - The drag over event.
   */
  const handleDragOver = (event) => {
    event.preventDefault(); // Necessary to allow dropping
    dropZoneRef.current.classList.add('dragging'); // Optional: Add visual feedback for dragging
  };

  /**
   * Handles the drag leave event when the dragged file leaves the drop area.
   * Removes the visual feedback for the dragging state.
   * @function
   */
  const handleDragLeave = () => {
    dropZoneRef.current.classList.remove('dragging'); // Remove visual feedback when dragging leaves
  };

  /**
   * Handles the drop event when a file is dropped onto the drop area.
   * Logs the name of the dropped file to the console.
   * @function
   * @param {Event} event - The drop event containing the file.
   */
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
