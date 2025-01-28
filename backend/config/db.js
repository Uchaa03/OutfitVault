import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded

/**
 * Connects to MongoDB using the URI provided in the environment variable.
 * This function initializes the MongoDB connection using mongoose, and
 * logs a success message with the host if the connection is successful.
 *
 * @function
 * @async
 * @throws {Error} Will exit the process if the connection fails.
 * @returns {void}
 */
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Additional options can be added here if needed
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};
