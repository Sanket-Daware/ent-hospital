const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = (folderName) => new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: `ent-hospital/${folderName}`,
    allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'mov'],
    transformation: [{ width: 1600, height: 1600, crop: 'limit', quality: 'auto', fetch_format: 'auto' }] // auto compression and dimension limit
  },
});

module.exports = { cloudinary, storage };
