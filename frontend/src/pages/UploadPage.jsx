import { useRef, useState } from "react";
import { useToken } from "../store/authStore.jsx";
import axios from "axios";
import ItemCard from "../components/Card/ItemCard.jsx";

const UploadPage = () => {
    const fileInputRef = useRef(null);
    const token = useToken();
    const [uploadedCloth, setUploadedCloth] = useState(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Selected file:', file.name);
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
                setUploadedCloth(response.data.cloth);
            } catch (error) {
                console.error('Error uploading file:', error);
                console.error('Error details:', error.response?.data);
            }
        }
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
            {uploadedCloth && (
                <ItemCard
                    name={uploadedCloth.name}
                    color={uploadedCloth.color}
                    category={uploadedCloth.category}
                    style={uploadedCloth.style}
                    itemImage={uploadedCloth.imageUrl}
                />
            )}
        </section>
    );
}

export default UploadPage;