// Import required packages
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;

// Create uploads folder if not exists

const uploadFolder = "uploads";

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Multer storage configuration

const storage = multer.diskStorage({
  // Folder where images will be stored
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },

  // Generate unique file name
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueFileName);
  },
});

// Image file validation

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Multer upload configuration

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
});

// Image optimization middleware

const processImage = async (req, res, next) => {
  // If no file is uploaded, move to next middleware
  if (!req.file) {
    return next();
  }

  try {
    const optimizedFileName = `optimized_${Date.now()}.jpg`;
    const optimizedPath = path.join(uploadFolder, optimizedFileName);

    // Resize and optimize image
    await sharp(req.file.path)
      .resize(450, 350)
      .jpeg({ quality: 80 })
      .toFile(optimizedPath);

    // Upload optimized image to Cloudinary
    const result = await cloudinary.uploader.upload(optimizedPath, {
      folder: "portfolio-uploads",
      public_id: optimizedFileName,
    });

    // Delete original and optimized local images
    fs.unlinkSync(req.file.path);
    fs.unlinkSync(optimizedPath);

    // Update request file info with Cloudinary URL
    req.file.path = result.secure_url;
    req.file.filename = optimizedFileName;

    next();
  } catch (error) {
    console.error("Image processing error:", error);
    res.status(500).json({
      error: "Image processing failed",
    });
  }
};

// Export middleware
module.exports = { upload, processImage };
