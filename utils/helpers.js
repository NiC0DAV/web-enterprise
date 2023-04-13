const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const Base64 = require('crypto-js/enc-base64');

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

module.exports = { validateResults, hashPassword };