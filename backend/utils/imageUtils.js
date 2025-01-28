import fs from 'fs';
import https from 'https';
import http from 'http';
import { v2 as cloudinaryV2 } from 'cloudinary';

/**
 * Downloads an image from a given URL and saves it to a specified path.
 * This function supports both HTTP and HTTPS protocols.
 *
 * @param {string} url - The URL of the image to be downloaded.
 * @param {string} path - The local path where the image will be saved.
 * @returns {Promise<void>} - A promise that resolves when the image has been successfully downloaded.
 * @throws {Error} - Throws an error if the download fails due to invalid URL or network issues.
 */
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

/**
 * Validates whether a given string is a valid URL.
 * This function attempts to create a URL object and checks if it succeeds.
 *
 * @param {string} url - The string to be validated as a URL.
 * @returns {boolean} - Returns `true` if the URL is valid, otherwise `false`.
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Uploads an image to Cloudinary from a provided buffer.
 * This function streams the image buffer to Cloudinary's uploader.
 *
 * @param {Buffer} fileBuffer - The image file buffer to be uploaded.
 * @returns {Promise<object>} - A promise that resolves with the Cloudinary upload result.
 * @throws {Error} - Throws an error if the upload fails.
 */
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
