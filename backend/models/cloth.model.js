import mongoose from "mongoose";

const clothsSchema = mongoose.Schema({ 
    name: { 
        type: String,
        required: true },
    color: { 
        type: String,
        required: true
    },
    category: { 
        type: String,
        required: true
    },
    style: {
        type: String, 
        required: true
     },
    description: { 
        type: String,
        required: true
    }, 
    imageUrl: { 
        type: String,
        required: true
    }

});

const Cloths = mongoose.model('Cloths', clothsSchema);

export default Cloths