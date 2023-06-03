import express from 'express';
import * as fs from 'fs';

const router = express.Router();
const PATH_ROUTES = __dirname;

const removeFileExtension = (fileName: string): string | undefined => {
    return fileName.split('.').shift();
}

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const fileName = removeFileExtension(file);
    if (fileName !== 'index') {
        console.log(`Cargando ruta ${fileName}`);
        import(`./${file}`).then((routeModule) => {
            if (routeModule.default && typeof routeModule.default === 'function') {
                router.use(`/${fileName}`, routeModule.default);
            }
        }).catch((error) => {
            console.error(`Error al cargar la ruta ${fileName}`, error);
        });
    }
});

export default router;
