const { adminsModel } = require('../models/index');
const { SECRET_JWT_KEY, JWT_VALIDITY_TIME, TYPE_TIME } = require('../config/environment');

const bcrypt = require("bcrypt");
const jwtLib = require('jsonwebtoken');
const moment = require('moment-timezone');

const tokenGen = async (res, email, plainPassword, verificationCode) => {  
    try {
        let login = false; 
        const admin = await adminsModel.findOne({ email: email, verif_code: verificationCode });

        if (admin) {
            const validatePassword = await comparePassword(plainPassword, admin.password);

            if (validatePassword) {
                const payload = {
                    sub: admin._id,
                    name: admin.name,
                    surname: admin.surname,
                    email: admin.email,
                    rol: admin.rol,
                    iat: moment().unix(),
                    exp: moment().add(JWT_VALIDITY_TIME, TYPE_TIME).unix()
                } 

                login = jwtLib.sign(payload, SECRET_JWT_KEY, { algorithm: 'HS256' });
            }
        }
        return login;
    } catch (error) {
        console.log(error);
        return false;
    }
}
const comparePassword = async (password, passHashed) => {
    const result = await bcrypt.compare(password, passHashed);
    return result;
}

module.exports = { tokenGen }