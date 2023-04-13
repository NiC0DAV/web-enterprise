const { validationResult } = require('express-validator');
const { SECRET_ADMIN, SLACK_WEBHOOK } = require('../config/environment');
const { IncomingWebhook } = require("@slack/webhook");

const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const Base64 = require('crypto-js/enc-base64');
const webHook = new IncomingWebhook(SLACK_WEBHOOK);

const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        res.status(403).send({ error: error.array() });
    }
}

const hashPassword = async (password, userType = "customer") => {
    try {
        if (userType === "admin") {
            const hashGen = await bcrypt.hash(pasword, 10);
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

const ansiRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PR-TZcf-ntqry=><]/g;
const removeANSI = str => str.replace(ansiRegex, '');

const loggerStream = {
    write: message => {
        const cleanMessage = removeANSI(message);
        webHook.send({
            text: cleanMessage
        });
    },
};


module.exports = { validateResults, hashPassword, loggerStream, removeANSI };