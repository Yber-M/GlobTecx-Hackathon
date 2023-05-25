const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload_directory = path.join(__dirname, "../upload_files/");

function generateUniqueFileName(original_name) {
  const timestamp = Date.now();
  const extension = original_name.split(".").pop();
  return `${timestamp}-${original_name}.${extension}`;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(upload_directory)) fs.mkdirSync(upload_directory);
    cb(null, upload_directory);
  },
  filename: (req, file, cb) => {
    const unique_file_name = generateUniqueFileName(file.originalname);
    cb(null, unique_file_name);
  },
});

const validate_file = (req, file, cb) => {
  const filetypes = /pdf/; // Expresión regular para verificar el formato del archivo
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) cb(null, true); // Acepta el archivo
  else cb(new Error("Ocurrió un error, el archivo debe ser un PDF."), false);
};

const upload = multer({
  storage: storage,
  fileFilter: validate_file,
});

module.exports = {
  upload,
};
