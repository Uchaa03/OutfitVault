import mongoose from 'mongoose';

/**
 * @description Subschema for clothing items associated with the user.
 * @typedef {Object} Cloth
 * @property {string} name - The name of the clothing item (e.g., "Leather Jacket").
 * @property {string} color - The color of the clothing item (e.g., "Black").
 * @property {string} category - The category of clothing (e.g., "Torso", "Pantalón").
 * @property {string} style - The style of the clothing (e.g., "Casual", "Formal").
 * @property {string} description - A description of the clothing item.
 * @property {string} imageUrl - The URL to the clothing image.
 */
const clothSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Sobretodo', 'Torso', 'Pantalón', 'Zapatos', 'Accesorios'],
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

/**
 * @description Main schema for the user that includes authentication details and clothing items.
 * @typedef {Object} User
 * @property {string} username - The username of the user (unique).
 * @property {string} email - The email address of the user (unique).
 * @property {string} password - The password of the user (hashed).
 * @property {Array<Cloth>} cloths - List of clothing items associated with the user (each item follows the clothSchema structure).
 */
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cloths: {
    type: [clothSchema], // Subdocument embedded in userSchema
    default: [],
  },
});

// Creating the User model using the schema
const User = mongoose.model('User', userSchema);
export default User;
