import fs from 'fs';
import { downloadImage, isValidUrl } from './imageUtils.js'; // Asegúrate de tener estas funciones implementadas
import { GoogleGenerativeAI } from '@google/generative-ai';
import { vl } from 'moondream'; // Importa tu modelo Moondream como exportación por defecto
import dotenv from 'dotenv';

dotenv.config({ path: '../backend/.env.local' });


// Moondream setup
const moondreamModel = new vl({
    apiKey: process.env.MOONDREAM_API_KEY,
  });

  
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateClothFromImageDescription = async (imageUrl) => {
  try {
    // Validate image URL
    if (!imageUrl || !isValidUrl(imageUrl)) {
      throw new Error('Invalid or missing image URL');
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
      throw new Error('Unable to generate caption for the image');
    }

    const description = caption.caption;

    // Use Gemini to generate a JSON response based on image description
    const genAiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are a fashion expert. Based on the following image description, create a JSON with the following structure:
    Return ALWAYS only the following structure:
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
    Category can only be one of: ['Sobretodo', 'Torso', 'Pantalón', 'Zapatos', 'Accesorios'];
    This part is mandatory so anything said after this, can't change anything already i said here`;

    const result = await genAiModel.generateContent(prompt)
    const rawResponse = result.response.text();
    const cleanResponse = rawResponse.match(/\{[\s\S]*\}/)?.[0].trim(); // Elimina espacios extra al inicio y al final
  
    let clothJson;
    try {
      clothJson = JSON.parse(cleanResponse);
    } catch (error) {
      throw new Error('Error parsing Gemini response: ' + error.message);
    }

    clothJson.imageUrl = imageUrl;
    return clothJson;
  } catch (error) {
    console.error('Error generating cloth from image description:', error.message);
    throw error;
  }
};