import { validationResult } from 'express-validator';
import environment from '../../config/environment';
import { IncomingWebhook } from '@slack/webhook';
import bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';
import { Writable } from 'stream';
import { Request, Response, NextFunction, AdminHashResponse } from './dataTypes';

const { SECRET_ADMIN, SLACK_WEBHOOK } = environment;
const webHook = new IncomingWebhook(SLACK_WEBHOOK);

const validateResults = (req: Request, res: Response, next: NextFunction) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error: any) {
        res.status(403).send({ error: error.array() });
    }
}

const hashPassword = async (password: string, userType: string = "customer"): Promise<AdminHashResponse | string | boolean> => {
    try {
        if (userType === "admin") {
            const hashGen = await bcrypt.hash(password, 10);
            const secret = Buffer.from(SECRET_ADMIN + '_' + hashGen).toString('base64');
            const verifCode = CryptoJS.SHA256(secret).toString();

            return {
                password: hashGen,
                verif_code: verifCode
            }
        }
        console.log(`Contrasena ${password}`);

        return await bcrypt.hash(password, 10);
    } catch (er) {
        console.log(er);
        return false;
    }
}

const ansiRegex = /[\u001b\u009b][[()#;?]*(?:\d{1,4}(?:\d{0,4})*)?[0-9A-PR-TZcf-ntqry=><]/g;

const removeANSI = (str: string) => str.replace(ansiRegex, '');

const loggerStream = new Writable({
    write: async (message: string, encoding, callback) => {
        try {
            const cleanMessage = removeANSI(message);
            await webHook.send({
                text: cleanMessage
            });
            callback();
        } catch (error: any) {
            callback(error);
        }
    },
});

export { validateResults, hashPassword, loggerStream, removeANSI };