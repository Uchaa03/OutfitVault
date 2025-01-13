import mongoose from 'mongoose';

const clothSchema = mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  category: { type: String, enum: ['Sobretodo', 'Torso', 'Pantalón', 'Zapatos', 'Accesorios'], required: true },
  style: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Cloth = mongoose.model('Cloth', clothSchema);
export default Cloth;