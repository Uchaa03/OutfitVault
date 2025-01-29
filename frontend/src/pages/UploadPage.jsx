import { useEffect, useRef, useState } from "react";
import { useToken } from "../store/authStore.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ItemCard from "../components/Card/ItemCard.jsx";
import LoadingPage from './LoadingPage.jsx';

/**
 * UploadPage component for handling file uploads.
 * This component allows the user to upload an image file (e.g., of clothing), and upon successful upload,
 * it displays a card with information about the uploaded item. The user can save the item to their collection.
 *
 * @component
 * @returns {JSX.Element} The UploadPage component.
 */
const UploadPage = () => {
    const fileInputRef = useRef(null);
    const token = useToken();
    const navigate = useNavigate();
    const [uploadedCloth, setUploadedCloth] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [animationClass, setAnimationClass] = useState('');

    /**
     * Handles the file selection and upload process.
     * It triggers when a user selects a file through the input element. The file is sent to the backend
     * using a POST request to upload the image. If successful, the uploaded cloth data is displayed.
     *
     * @async
     * @param {Object} event - The change event triggered by the file input.
     * @returns {Promise<void>} Resolves when the file upload is completed.
     */
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Selected file:', file.name);
            const formData = new FormData();
            formData.append('image', file);
            setLoading(true);

      try {
        const response = await axios.post(
          `${process.env.VITE_API_BASE_URL}api/cloths`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        const hasUnknownFields = checkForUnknownFields(response.data.cloth);

        // Simulatiing a delay to show the loading animation
        setTimeout(() => {
          setLoading(false);
          if (hasUnknownFields) {
            setHasError(true);
          } else {
            setUploadedCloth(response.data.cloth);
            setAnimationClass('slide-in');
            setTimeout(() => {
              setAnimationClass('float');
            }, 1000);
          }
        }, 800);
      } catch (error) {
        console.error('Error uploading file:', error);
        setLoading(false);
        setHasError(true);
      }
    }
  };

    /**
     * Handles saving the uploaded cloth data to the user's collection.
     * It triggers a POST request to save the uploaded cloth and then navigates to the vault page.
     *
     * @async
     * @returns {Promise<void>} Resolves after saving the cloth data.
     */
    const handleSaveClick = async () => {
        try {
            await axios.post(
              `${process.env.VITE_API_BASE_URL}api/cloths/save`,
              { cloth: uploadedCloth },
              {
                  headers: {
                      'Authorization': `Bearer ${token}`,
                  },
              }
            );
            navigate('/vault'); // Navigate to vault after saving
        } catch (error) {
            console.error('Error saving cloth:', error);
        }
    };

    /**
     * Resets the uploaded cloth and hides the uploaded item card.
     * This is triggered when the user clicks the close button.
     */
    const handleCloseClick = () => {
        setUploadedCloth(null);
        setDataLoaded(false);
        setAnimationClass('');
       setHasError(false);
    };

  if (loading) {
    return (
      <LoadingPage isVisible={loading} onFinish={() => setLoading(false)} />
    );
  }

  return (
    <section className='upload'>
      <label htmlFor="file-upload" className="upload__section">
        <h1>Sube o arrastra una imagen de tu prenda para agregarla</h1>
        <p>Selecciona para subir archivo de tu explorador</p>
        <img src="/assets/img/upload_icon.svg" alt="Icono de subida de imagen" />
        <button type="button" onClick={() => fileInputRef.current.click()}>Browse</button>
        <input
          id="file-upload"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </label>

      {((uploadedCloth || hasError) && !loading) && (
        <div className={`overlay ${uploadedCloth || hasError ? 'loaded' : 'loading'}`}>
          {hasError ? (
            <ItemCard
              className={animationClass}
              error={true}
              onCloseClick={handleCloseClick}
            />
          ) : (
            <ItemCard
              className={animationClass}
              name={uploadedCloth.name}
              color={uploadedCloth.color}
              category={uploadedCloth.category}
              style={uploadedCloth.style}
              itemImage={uploadedCloth.imageUrl}
              buttonActionName={"Guardar"}
              onClickButton={handleSaveClick}
              onCloseClick={handleCloseClick}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default UploadPage;
