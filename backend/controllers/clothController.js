import multer from 'multer';
import mongoose from 'mongoose';
import { generateClothFromImageDescription } from '../utils/gemini.js';
import User from '../models/user.model.js';
import { uploadImageToCloudinary } from '../utils/imageUtils.js';

// Multer configuration for temporary image storage
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage }).single('image');

// Controller to create a cloth using Gemini and Cloudinary
export const createCloth = async (req, res) => {
  try {
    const { file } = req;  // 'file' is the name assigned by multer to the uploaded file

    // Check if the image was provided
    if (!file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    // Upload the image to Cloudinary
    const cloudinaryResponse = await uploadImageToCloudinary(file.buffer);
    const imageUrl = cloudinaryResponse.secure_url;

    // Use Gemini to get description and other data
    const description = await generateClothFromImageDescription(imageUrl);
    
    // Create the cloth object using the obtained data
    const newCloth = {
      _id: new mongoose.Types.ObjectId(), // Ensure a unique identifier
      name: description.name,
      color: description.color,
      category: description.category,
      style: description.style,
      description: description.description,
      imageUrl: imageUrl,
    };

    // Associate the cloth with the logged-in user
    const user = await User.findById(req.user._id);


    res.status(200).json({ success: true, cloth: newCloth });
  } catch (error) {
    console.error('Error creating cloth:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};


// Controller to get all cloths of a user
export const getCloths = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cloths');
    res.status(200).json({ success: true, cloths: user.cloths });
  } catch (error) {
    console.error('Error getting cloths:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
}

// Controller to get a cloth by ID
export const getClothById = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cloths');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const cloth = user.cloths.id(req.params.id);
    if (!cloth) {
      return res.status(404).json({ success: false, message: 'Cloth not found' });
    }

    res.status(200).json({ success: true, cloth });
  } catch (error) {
    console.error('Error getting cloth by ID:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
}

// Controller to delete a cloth
export const deleteCloth = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cloths');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const cloth = user.cloths.id(req.params.id);
    if (!cloth) {
      return res.status(404).json({ success: false, message: 'Cloth not found' });
    }

    // Remove the cloth from the user's cloths array
    user.cloths.pull(cloth._id);
    await user.save(); // Save the user after removing the cloth
    res.status(200).json({ success: true, message: 'Cloth deleted' });
  } catch (error) {
    console.error('Error deleting cloth:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
}


// Controller to associate a cloth with the logged-in user
export const saveClothToUser = async (req, res) => {
  try {
    const clothData = req.body.cloth;

    // Ensure the cloth has a unique identifier
    if (!clothData._id) {
      clothData._id = new mongoose.Types.ObjectId();
    }

    // Associate the cloth with the logged-in user
    const user = await User.findById(req.user._id);
    user.cloths.push(clothData);
    await user.save();

    res.status(200).json({ success: true, message: 'Cloth associated with user successfully', cloth: clothData });
  } catch (error) {
    console.error('Error saving cloth to user:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

// Controller to get available filters
export const getAvailableFilters = async (req, res) => {
  try {
    const userId = req.user._id; // Ensure userId is correctly obtained from the authenticated user

    // Get the user with their cloths
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Get unique colors and styles from the user's cloths
    const colors = [...new Set(user.cloths.map(cloth => cloth.color))];
    const styles = [...new Set(user.cloths.map(cloth => cloth.style))];

    res.status(200).json({ success: true, filters: { colors, styles } });
  } catch (error) {
    console.error('Error getting available filters:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
}

// Controller to filter cloths
export const filterCloths = async (req, res) => {
  try {
    const { category, color, style } = req.query;
    const userId = req.user._id;

    // Get the user with their cloths
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Filter the user's cloths
    let filteredCloths = user.cloths;

    if (category) {
      filteredCloths = filteredCloths.filter(cloth => cloth.category === category);
    }
    if (color) {
      filteredCloths = filteredCloths.filter(cloth => cloth.color === color);
    }
    if (style) {
      filteredCloths = filteredCloths.filter(cloth => cloth.style === style);
    }

    res.status(200).json({ success: true, cloths: filteredCloths });
  } catch (error) {
    console.error('Error filtering cloths:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
}


// Controller to recommend an outfit based on user prompt
export const recommendOutfit = async (req, res) => {
  try {
    const { userPrompt } = req.body;

    if (!userPrompt) {
      return res.status(400).json({ success: false, message: 'User prompt not provided' });
    }

    // Retrieve the authenticated user and their clothes
    const user = await User.findById(req.user._id).populate('cloths');
    if (!user || user.cloths.length === 0) {
      return res.status(404).json({ success: false, message: 'No clothes found for the user' });
    }

    // Build JSON of clothes available
    const clothsJson = user.cloths.map((cloth) => ({
      id: cloth._id,
      name: cloth.name,
      color: cloth.color,
      category: cloth.category,
      style: cloth.style,
      description: cloth.description,
      imageUrl: cloth.imageUrl,
    }));

    // Use Gemini to get outfit recommendation
    const outfitJson = await generateOutfitRecommendation(clothsJson, userPrompt);

    res.status(200).json({ success: true, outfit: outfitJson });
  } catch (error) {
    console.error('Error generating outfit recommendations:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};