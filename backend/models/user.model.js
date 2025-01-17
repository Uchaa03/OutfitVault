import mongoose from 'mongoose';

// Subschema inside userSchema
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

// Primary schema
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

const User = mongoose.model('User', userSchema);
export default User;
