import fs from 'fs';
import https from 'https';
import http from 'http';
import { v2 as cloudinaryV2 } from 'cloudinary';

// Function to download an image from a URL and save it to a specified path
export const downloadImage = (url, path) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path);
    const request = url.startsWith('https') ? https : http;

    request.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => resolve());
    }).on('error', (error) => reject(error));
  });
};

// Function to validate if a given string is a valid URL
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

// Function to upload an image to Cloudinary
export const uploadImageToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinaryV2.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    ).end(fileBuffer);
  });
};