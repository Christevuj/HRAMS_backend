const multer = require('multer');
const sharp = require('sharp'); // Import Sharp for image processing
const { Readable } = require('stream');
const cloudinary = require("./cloudinary.js")

const storage = multer.memoryStorage();

const multerCloudinary = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit (adjust as needed)
}).single('file');

const uploadToCloudinary = (folder) => (req, res, next) => {
  multerCloudinary(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File too large. Max size is 5MB.' });
      }
      return res.status(400).json({ message: 'Error uploading file', error: err.message });
    } else if (err) {
      return res.status(400).json({ message: 'Error uploading file', error: err.message });
    }

    if (!req.file) {
      console.log('No file uploaded, proceeding with existing image.');
      return next();
    }

    try {
      // Use Sharp to compress/resize the image
      const compressedBuffer = await sharp(req.file.buffer)
        .resize({ width: 800 }) // Resize the image to a max width (e.g., 800px)
        .jpeg({ quality: 70 }) // Compress the image and set quality to 70%
        .toBuffer();

      const bufferStream = new Readable();
      bufferStream.push(compressedBuffer);
      bufferStream.push(null);

      cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            return res.status(500).json({ message: 'Error uploading to Cloudinary', error: error.message });
          }

          req.file.url = result.secure_url; 
          next();
        }
      ).end(compressedBuffer); 
    } catch (uploadError) {
      return res.status(500).json({ message: 'Error processing image', error: uploadError.message });
    }
  });
};

async function uploadFileToCloudinary(file, folder) {
  try {
    let uploadBuffer;
    if (file.mimetype.startsWith('image/')) {
      uploadBuffer = await sharp(file.buffer)
        .resize({ width: 800 })
        .jpeg({ quality: 70 })
        .toBuffer();
    } else {
      
      uploadBuffer = file.buffer;
    }
    return new Promise((resolve, reject) => {
      const isPdf = file.mimetype === "application/pdf";
      cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: isPdf ? "raw" : "auto",
          type: "upload", 
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result.secure_url);
        }
      ).end(uploadBuffer);
    });
  } catch (error) {
    throw error;
  }
}


module.exports = {uploadToCloudinary,uploadFileToCloudinary};
