// Import required packages
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

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

    // Delete original uploaded image
    fs.unlinkSync(req.file.path);

    // Update request file info
    req.file.filename = optimizedFileName;
    req.file.path = optimizedPath;

    next();
  } catch (error) {
    res.status(500).json({
      error: "Image processing failed",
    });
  }
};

// Export middleware
module.exports = { upload, processImage };
