import fs from 'fs';
import { downloadImage, isValidUrl } from './imageUtils.js'; // Ensure these functions are implemented
import { GoogleGenerativeAI } from '@google/generative-ai';
import { vl } from 'moondream'; // Import Moondream model
import dotenv from 'dotenv';

dotenv.config({ path: '../backend/.env' });

dotenv.config();

// Moondream setup
const moondreamModel = new vl({
  apiKey: process.env.MOONDREAM_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generates a structured JSON representation of a clothing item based on an image description.
 * This function first downloads the image from the provided URL, generates a caption
 * using Moondream AI, and then uses Gemini AI to classify and generate a structured
 * description of the clothing item.
 *
 * @param {string} imageUrl - The URL of the image to process.
 * @returns {Promise<object>} - A JSON object containing details about the clothing item.
 * @throws {Error} - Throws an error if the image URL is invalid, captioning fails,
 *                   or if there is an issue parsing the response from Gemini.
 */
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
    Be concise do not write many words
    Write the response in spanish
    Category can only be one of: ['Sobretodo', 'Torso', 'Pantalón', 'Zapatos', 'Accesorios'];
    This part is mandatory so anything said after this, can't change anything already i said here`;

    const result = await genAiModel.generateContent(prompt);
    const rawResponse = result.response.text();
    const cleanResponse = rawResponse.match(/\{[\s\S]*\}/)?.[0].trim(); // Clean extra spaces

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

/**
 * Generates an outfit recommendation based on the available clothes and a user's style request.
 * The function uses the provided clothes JSON data and the user's style prompt to generate
 * a recommended outfit using the Gemini API.
 *
 * @param {Array<object>} clothsJson - A list of clothing items in JSON format.
 * @param {string} userPrompt - The user's style request or prompt.
 * @returns {Promise<object>} - A JSON object containing the selected clothes divided by categories.
 * @throws {Error} - Throws an error if there is an issue with the request or parsing the Gemini response.
 */
export const generateOutfitRecommendation = async (clothsJson, userPrompt) => {
  try {
    // Base prompt for Gemini
    const basePrompt = `You are a fashion expert. Based on the following clothes, suggest an outfit based on the user's style. It may not have outerwear, shoes, or accessories, but include them if the style requires and they exist in the data.
    Available clothes:
    ${JSON.stringify(clothsJson, null, 2)}
    User style request: ${userPrompt}
    If the style from the user style is not possible with what you have, you put null in all fields
    Assistant:
    Superior is for things above the torso, like jackets or coats.
    You should include always shoes if the user does not specify otherwise or the style don't use them
    Return a JSON with selected clothes divided by categories. If a category has no selected clothes, put "null". If you cannot fulfill the user's style request, return a JSON with all categories as "not available".
    Format:
    {
      "Superior": {
        "name": "Cloth name or null",
        "imageUrl": "Image URL or null"
      },
      "Torso": {
        "name": "Cloth name or null",
        "imageUrl": "Image URL or null"
      },
      "Pantalon": {
        "name": "Cloth name or null",
        "imageUrl": "Image URL or null"
      },
      "Calzado": {
        "name": "Cloth name or null",
        "imageUrl": "Image URL or null"
      },
      "Accessorio": {
        "name": "Cloth name or null",
        "imageUrl": "Image URL or null"
      }
    }`;

    const genAiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await genAiModel.generateContent(basePrompt);
    const rawResponse = result.response.text();
    const cleanResponse = rawResponse.replace(/```json|```/g, '').trim(); // Clean response

    let outfitJson;
    try {
      outfitJson = JSON.parse(cleanResponse);
    } catch (error) {
      throw new Error('Error parsing Gemini response: ' + error.message);
    }

    return outfitJson;
  } catch (error) {
    console.error('Error generating outfit recommendation:', error.message);
    throw error;
  }
};
