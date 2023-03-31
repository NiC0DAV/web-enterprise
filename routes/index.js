const express = require("express");
const router = express.Router();
const fs = require("fs");

const PATH_ROUTES = __dirname;

const removeFileExtension = (fileName) => {
    return fileName.split('.').shift();
}

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const fileName = removeFileExtension(file);
    if (fileName !== 'index') {
        console.log(`Cargando ruta ${fileName}`);
        router.use(`/${fileName}`, require(`./${file}`));
    }
});

module.exports = router;