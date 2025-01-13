import express from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary'
import { Readable } from 'stream'
import dotenv from 'dotenv'
import Cloths from './models/cloth.model.js'
import { connectDB } from './config/db.js'
import cors from 'cors'

dotenv.config()

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Multer configuration (in-memory storage)
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.get("/api/cloths", async (req, res) => {
  try {
    const cloths = await Cloths.find()
    res.status(200).json({ success: true, data: cloths })
  } catch (error) {
    console.log('Error in fetching cloths:', error.message)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Route to create a new cloth (with or without image)
app.post('/api/cloths', upload.single('image'), async (req, res) => {
  const cloth = req.body

  let imageUrl = null  // Variable to store the image URL

  // Check if an image has been uploaded
  if (req.file) {
    try {
      // Create a stream to upload to Cloudinary
      const streamUpload = (file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.v2.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
              if (error) {
                return reject(error)
              }
              resolve(result)
            }
          )
          
          const bufferStream = new Readable()
          bufferStream.push(file.buffer)
          bufferStream.push(null) // End the stream
          bufferStream.pipe(stream) // Pipe the buffer to Cloudinary
        })
      }

      // Upload the file to Cloudinary
      const uploadResult = await streamUpload(req.file)

      // Get the image URL from Cloudinary
      imageUrl = uploadResult.secure_url
    } catch (error) {
      console.log('Error in uploading image:', error.message)
      return res.status(500).json({ success: false, message: 'Error uploading image' })
    }
  }

  // Verify that all fields are present, except for the image
  if (!cloth.name || !cloth.color || !cloth.category || !cloth.style || !cloth.description) {
    return res.status(400).json({ success: false, message: 'All fields except image are required' })
  }

  // Create the new cloth with the image URL if uploaded
  const newCloth = new Cloths({
    ...cloth,
    imageUrl: imageUrl || null,  // If no image, save null
  })

  // Save the cloth to the database
  try {
    await newCloth.save()
    res.status(201).json({ success: true, data: newCloth })
  } catch (error) {
    console.log('Error in creating cloth:', error.message)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

app.delete('/api/cloths/:id', async (req, res) => {
  const { id } = req.params

  try {
    await Cloths.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: 'Cloth deleted' })
  } catch (error) {
    console.log('Error in deleting cloth:', error.message)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// APP PUT NOT DONE BECAUSE WE WONT MAKE UPDATABLE THE CLOTHS

app.listen(5000, () => {
  connectDB()
  console.log('Server listening on port 5000')
})