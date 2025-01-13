import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { Readable } from 'stream';
import dotenv from 'dotenv';
import Cloths from './models/cloth.model.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { vl } from 'moondream';
import fs from 'fs';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import Google Generative AI client

dotenv.config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// Multer configuration (in-memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Moondream setup
const moondreamModel = new vl({
  apiKey: process.env.MOONDREAM_API_KEY,
});

// Function to download an image from a URL
async function downloadImage(url, filepath) {
  try {
    const response = await axios({ url, responseType: 'stream' });
    return new Promise((resolve, reject) => {
      const stream = response.data.pipe(fs.createWriteStream(filepath));
      stream.on('finish', () => resolve());
      stream.on('error', (err) => reject(err));
    });
  } catch (error) {
    throw new Error(`Error downloading image: ${error.message}`);
  }
}

// Validate if the URL is valid
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

// Routes
app.get('/api/cloths', async (req, res) => {
  try {
    const cloths = await Cloths.find();
    res.status(200).json({ success: true, data: cloths });
  } catch (error) {
    console.error('Error fetching clothes:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Endpoint to upload a new cloth
app.post('/api/cloths', upload.single('image'), async (req, res) => {
  const cloth = req.body;
  let imageUrl = null;

  if (req.file) {
    try {
      // Function to upload image to Cloudinary
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
          bufferStream.push(null);
          bufferStream.pipe(stream);
        });
      };

      const uploadResult = await streamUpload(req.file);
      imageUrl = uploadResult.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error.message);
      return res.status(500).json({ success: false, message: 'Error uploading image' });
    }
  }

  // Validate required fields
  if (!cloth.name || !cloth.color || !cloth.category || !cloth.style || !cloth.description) {
    return res.status(400).json({ success: false, message: 'All fields except image are required' });
  }

  // Save the new cloth in the database
  const newCloth = new Cloths({
    ...cloth,
    imageUrl: imageUrl || null,
  });

  try {
    await newCloth.save();
    res.status(201).json({ success: true, data: newCloth });
  } catch (error) {
    console.error('Error creating new cloth:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Endpoint to delete a cloth
app.delete('/api/cloths/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Cloths.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Cloth deleted' });
  } catch (error) {
    console.error('Error deleting cloth:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Endpoint to describe an image using Moondream
app.post('/describe-image', async (req, res) => {
  try {
    const { imageUrl } = req.body;

    // Validate image URL
    if (!imageUrl || !isValidUrl(imageUrl)) {
      return res.status(400).json({ success: false, message: 'Invalid or missing image URL' });
    }

    const imagePath = './temp_image.jpg';
    await downloadImage(imageUrl, imagePath);

    const image = fs.readFileSync(imagePath);
    const caption = await moondreamModel.caption({
      image: image,
      length: 'normal',
      stream: false,
    });

    fs.unlinkSync(imagePath);

    res.status(200).json({ success: true, description: caption.caption });
  } catch (error) {
    console.error('Error describing image:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Setup Google Gemini API client
const geminiApiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiApiKey);

// Endpoint to process image and generate detailed description using Google Gemini
app.post('/process-image', async (req, res) => {
  try {
    const { imageUrl } = req.body;

    // Validate image URL
    if (!imageUrl || !isValidUrl(imageUrl)) {
      return res.status(400).json({ success: false, message: 'Invalid or missing image URL' });
    }

    const imagePath = './temp_image.jpg';
    await downloadImage(imageUrl, imagePath);

    const image = fs.readFileSync(imagePath);
    const caption = await moondreamModel.caption({
      image: image,
      length: 'normal',
      stream: false,
    });

    fs.unlinkSync(imagePath);

    // If caption not found, return error
    if (!caption || !caption.caption) {
      return res.status(500).json({ success: false, message: 'Unable to generate caption for the image' });
    }

    const description = caption.caption;

    // Use Gemini to generate a JSON response based on image description
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are a fashion expert. Based on the following image description, create a JSON with the following structure:
      {
        "name": "Cloth name or 'unknown'",
        "color": "Cloth color or 'unknown'",
        "category": "Cloth category or 'unknown'",
        "style": "Cloth style or 'unknown'",
        "description": "Provided description of the cloth",
        "imageUrl": "Image URL"
      }
      Image description: "${description}"
      Image URL: "${imageUrl}"
      Category can only be one of: ['Coat', 'Torso', 'Pants', 'Shoes', 'Accessories'];`;

    const result = await model.generateContent(prompt);

    const rawResponse = result.response.text();
    const cleanResponse = rawResponse.replace(/json|\n/g, '').trim(); // Clean response

    let clothJson;
    try {
      clothJson = JSON.parse(cleanResponse);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error parsing Gemini response',
        error: error.message,
      });
    }

    clothJson.imageUrl = imageUrl;

    // Save the generated cloth in the database
    const newCloth = new Cloths(clothJson);
    await newCloth.save();

    res.status(200).json({ success: true, cloth: clothJson });
  } catch (error) {
    console.error('Error in /process-image:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

// Endpoint to recommend outfit based on user input
app.post('/recommend-outfit', async (req, res) => {
  try {
    const { userPrompt } = req.body;

    if (!userPrompt) {
      return res.status(400).json({ success: false, message: 'User prompt not provided' });
    }

    // Retrieve all clothes from the database
    const userCloths = await Cloths.find();

    if (!userCloths || userCloths.length === 0) {
      return res.status(404).json({ success: false, message: 'No clothes found in the database' });
    }

    // Build JSON of clothes available
    const clothsJson = userCloths.map((cloth) => ({
      id: cloth._id,
      name: cloth.name,
      color: cloth.color,
      category: cloth.category,
      style: cloth.style,
      description: cloth.description,
      imageUrl: cloth.imageUrl,
    }));

    // Base prompt for Gemini
    const basePrompt = `You are a fashion expert. Based on the following clothes, suggest an outfit based on the user's style. It may not have outerwear, shoes, or accessories, but include them if the style requires and they exist in the data.
    Available clothes:
    ${JSON.stringify(clothsJson, null, 2)}
    User style request: ${userPrompt}
    Assistant:
    Return a JSON with selected clothes divided by categories. If a category has no selected clothes, put "null". If you cannot fulfill the user's style request, return a JSON with all categories as "not available".
    Format:
    {
      "Torso": "id or null",
      "Pants": "id or null",
      "Coat": "id or null",
      "Shoes": "id or null",
      "Accessories": "id or null"
    }`;

    // Create the model using Google Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Call Gemini for outfit recommendations
    const result = await model.generateContent(basePrompt);

    // Clean the response
    const rawResponse = result.response.text();
    const cleanResponse = rawResponse.replace(/```json|```/g, '').trim(); // Clean response

    let outfitJson;
    try {
      outfitJson = JSON.parse(cleanResponse);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error parsing Gemini response',
        error: error.message,
        rawResponse: cleanResponse, // Include raw response for debugging
      });
    }

    res.status(200).json({ success: true, outfit: outfitJson });
  } catch (error) {
    console.error('Error generating outfit recommendations:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log('Server listening on port 5000');
});
