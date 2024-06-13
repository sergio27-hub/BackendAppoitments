import multer from "multer";
import fs from "fs";

// Función para crear una carpeta si no existe
const createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const storageProducts = multer.diskStorage({
  destination (req, file, cb) {
    const folderName = req.body.name || 'default'; // Usar el nombre del servicio
    const uploadPath = `./public/services/${folderName}/`;
    createFolderIfNotExists(uploadPath);
    cb(null, uploadPath);
  },
  filename (req, file, cb) {
    if(file !== null){
      const ext = file.originalname.split('.').pop();
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    };
  }
});

const filterProducts = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
    cb(null, true);
  } else {
    cb(null, false);
  }
}

export const uploadServices = multer({ storage: storageProducts, fileFilter: filterProducts }).array('images', 10);
