import { useEffect, useRef, useState } from "react";
import { useToken } from "../store/authStore.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ItemCard from "../components/Card/ItemCard.jsx";
import LoadingPage from './LoadingPage.jsx';

const UploadPage = () => {
  const fileInputRef = useRef(null);
  const token = useToken();
  const navigate = useNavigate();
  const [uploadedCloth, setUploadedCloth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!loading && uploadedCloth) {
      setDataLoaded(true);
    }
  }, [loading, uploadedCloth]);

  const checkForUnknownFields = (cloth) => {
    return cloth.name === "unknown" ||
      cloth.color === "unknown" ||
      cloth.category === "unknown" ||
      cloth.style === "unknown";
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      setHasError(false);
      const formData = new FormData();
      formData.append('image', file);

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
      navigate('/vault');
    } catch (error) {
      console.error('Error saving cloth:', error);
    }
  };

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