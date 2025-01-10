import { useState } from 'react';
import './App.css';

// TEST HOME 


function App() {
  const [clothData, setClothData] = useState({
    name: '',
    color: '',
    category: '',
    style: '',
    description: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClothData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setClothData((prevData) => ({
      ...prevData,
      image: e.target.files[0] // Guarda el archivo de imagen
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si hay una imagen
    if (!clothData.image) {
      alert('Please upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('name', clothData.name);
    formData.append('color', clothData.color);
    formData.append('category', clothData.category);
    formData.append('style', clothData.style);
    formData.append('description', clothData.description);
    formData.append('image', clothData.image);

    try {
      const response = await fetch('http://localhost:5000/api/cloths', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert('Cloth successfully uploaded');
        // Limpia el formulario
        setClothData({
          name: '',
          color: '',
          category: '',
          style: '',
          description: '',
          image: null
        });
      } else {
        alert('Error uploading cloth');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the cloth');
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Cloth Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={clothData.name}
          onChange={handleInputChange}
          required
        /><br /><br />

        <label htmlFor="color">Color:</label>
        <input
          type="text"
          id="color"
          name="color"
          value={clothData.color}
          onChange={handleInputChange}
          required
        /><br /><br />

        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={clothData.category}
          onChange={handleInputChange}
          required
        /><br /><br />

        <label htmlFor="style">Style:</label>
        <input
          type="text"
          id="style"
          name="style"
          value={clothData.style}
          onChange={handleInputChange}
          required
        /><br /><br />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={clothData.description}
          onChange={handleInputChange}
          required
        ></textarea><br /><br />

        <label htmlFor="image">Upload Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
          required
        /><br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
