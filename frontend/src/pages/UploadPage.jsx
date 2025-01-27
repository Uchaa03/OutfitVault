import { useRef, useState, useEffect } from "react";
import { useToken } from "../store/authStore.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ItemCard from "../components/Card/ItemCard.jsx";

const UploadPage = () => {
    const fileInputRef = useRef(null);
    const token = useToken();
    const navigate = useNavigate();
    const [uploadedCloth, setUploadedCloth] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [animationClass, setAnimationClass] = useState('');

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
                setUploadedCloth(response.data.cloth);
                console.log(response.data.cloth);
                setDataLoaded(true);
                setAnimationClass('slide-in');
                setTimeout(() => {
                    setAnimationClass('float');
                }, 1000); // Duración de la animación slide-in
            } catch (error) {
                console.error('Error uploading file:', error);
                console.error('Error details:', error.response?.data);
            } finally {
                setLoading(false);
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
    };

    return (
        <section className='upload'>
            <label htmlFor="file-upload" className={`upload__section`}>
                <h1>Sube o arrastra una imagen de tu prenda para agregarla</h1>
                <p>Selecciona para subir archivo de tu explorador</p>
                <img src="/assets/img/upload_icon.svg" alt="Icono de subida de imagen" />
                <button type="button" onClick={() => fileInputRef.current.click()}>Browse</button>

                {/* Hidden file input */}
                <input
                    id="file-upload"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }} // Hide the input, it will be triggered by the label
                />
            </label>
            {(loading || uploadedCloth) && (
                <div className={`overlay ${uploadedCloth ? 'loaded' : 'loading'}`}>
                    {loading && <div className="loader">Loading...</div>}
                    {uploadedCloth && (
                        <ItemCard
                            className={animationClass}
                            name={uploadedCloth.name}
                            color={uploadedCloth.color}
                            category={uploadedCloth.category}
                            style={uploadedCloth.style}
                            itemImage={uploadedCloth.imageUrl}
                            onSaveClick={handleSaveClick}
                            onCloseClick={handleCloseClick}
                        />
                    )}
                </div>
            )}
        </section>
    );
}

export default UploadPage;