import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { Readable } from 'stream';
import dotenv from 'dotenv';
import Cloths from './models/cloth.model.js';
import { connectDB } from './config/db.js';
import cors from 'cors';

dotenv.config();

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configuración de multer (almacenamiento en memoria)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/api/cloths", async (req, res) => {
  try {
    const cloths = await Cloths.find();
    res.status(200).json({ success: true, data: cloths });
  } catch (error) {
    console.log('Error in fetching cloths:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }

})
// Ruta para crear una nueva prenda (con o sin imagen)
app.post('/api/cloths', upload.single('image'), async (req, res) => {
  const cloth = req.body;

  let imageUrl = null;  // Variable para almacenar la URL de la imagen

  // Verifica si se ha subido una imagen
  if (req.file) {
    try {
      // Crear un flujo de datos (stream) para subir a Cloudinary
      const streamUpload = (file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.v2.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve(result);
            }
          );
          
          const bufferStream = new Readable();
          bufferStream.push(file.buffer);
          bufferStream.push(null); // Finaliza el flujo
          bufferStream.pipe(stream); // Enviar el buffer a Cloudinary
        });
      };

      // Subir el archivo a Cloudinary
      const uploadResult = await streamUpload(req.file);

      // Obtener la URL de la imagen de Cloudinary
      imageUrl = uploadResult.secure_url;
    } catch (error) {
      console.log('Error in uploading image:', error.message);
      return res.status(500).json({ success: false, message: 'Error uploading image' });
    }
  }

  // Verificar que todos los campos estén presentes, exceptuando la imagen
  if (!cloth.name || !cloth.color || !cloth.category || !cloth.style || !cloth.description) {
    return res.status(400).json({ success: false, message: 'All fields except image are required' });
  }

  // Crear la nueva prenda con la URL de la imagen si se subió
  const newCloth = new Cloths({
    ...cloth,
    imageUrl: imageUrl || null,  // Si no hay imagen, guardamos null
  });

  // Guardar la prenda en la base de datos
  try {
    await newCloth.save();
    res.status(201).json({ success: true, data: newCloth });
  } catch (error) {
    console.log('Error in creating cloth:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.delete('/api/cloths/:id', async (req, res) => {
  const { id } = req.params;

  try{
    await Cloths.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Cloth deleted' });
  } catch (error) {
    console.log('Error in deleting cloth:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }

})

// APP PUT NOT DONE BECAUSE WE WONT MAKE UPDATABLE THE CLOTHS

app.listen(5000, () => {
  connectDB();
  console.log('Server listening on port 5000');
});
