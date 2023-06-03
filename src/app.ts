import dotenv from "dotenv";
dotenv.config();
import morganBody from 'morgan-body';
import express, { Request, Response } from 'express';
import cors from 'cors';
import dbConnect from '../config/mongo';
import bodyParser from 'body-parser';
import environment from '../config/environment';
import { loggerStream } from './utils/helpers';
import router from './routes';

const app = express();
const { PUBLIC_FOLDER, BASE_ROUTE_NAME, ROUTES_FOLDER, PORT } = environment;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

morganBody(app, {
    stream: loggerStream,
    skip: function (req: Request, res: Response) {
        return res.statusCode < 400;
    }
});

app.use(express.static(PUBLIC_FOLDER));
app.use(BASE_ROUTE_NAME, router);

app.listen(PORT, () => console.log(`App corriendo en http//:localhost:${PORT}`));

dbConnect();