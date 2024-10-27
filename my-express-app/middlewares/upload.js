const multer = require("multer");
const {fromBuffer} = require("file-type");
const fs = require("fs");

const path = require("node:path");
const getFileHash = require("../utils/hashFile");

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
const storage = multer.memoryStorage()

const validateAndSave = async  (req, res, next) =>{
    try {
        if (!req.files[0]) {
            return res.status(400).json({ error: true, message: "Aucun fichier n'a été téléchargé." });
        }
        const imageUrls = []
        for (const file of req.files) {
            const fileType = await fromBuffer(file.buffer);
            console.log(fileType)
            const extension = MIME_TYPES[fileType?.mime];
            console.log(extension);
            if (!fileType || !extension) {
                return res.status(400).json({ error: true, message: `Type de fichier non autorisé : ${file.originalname}` });
            }
            const filename = `${file.originalname.split(" ").join('_')}${Date.now()}.${extension}`;
            const filePath = path.resolve(__dirname, `../public/images/${filename}`);
            fs.writeFileSync(filePath,file.buffer)
            const hash = await getFileHash(filePath);
            const imageUrl= `${req.protocol}://${req.get('host')}/public/images/${filename}`
            imageUrls.push(
                {
                    imageUrl,
                    hash
                }

            )
        }
        req.imageUrls = imageUrls;
        next()
    }catch (error) {
        console.error("Erreur lors de l'upload des fichiers :", error);
        res.status(500).json({ error: true, message: "Erreur interne lors de l'upload des fichiers." });
    }
}

upload = multer({storage : storage}).array('images')

module.exports = {upload, validateAndSave}