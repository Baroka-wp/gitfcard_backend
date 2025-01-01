const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Chemin du dossier de stockage
const uploadPath = path.join(__dirname, '../../uploads/products');

// Assurez-vous que le dossier de stockage existe
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configuration du stockage Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Vérifie et crée dynamiquement le dossier si nécessaire
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath); // Dossier où les images seront stockées
    },
    filename: (req, file, cb) => {
        // Génère un nom unique pour le fichier
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Filtrage des types de fichiers
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

// Initialiser Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5 MB
    fileFilter: fileFilter,
});

module.exports = upload;
