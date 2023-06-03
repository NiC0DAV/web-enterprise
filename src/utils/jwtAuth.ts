import models from '../models/index';
import environment from '../../config/environment';
import bcrypt from 'bcrypt';
import jwtLib from 'jsonwebtoken';
import moment from 'moment-timezone';
import { Request } from 'express';

const { adminsModel } = models;
const { SECRET_JWT_KEY, JWT_VALIDITY_TIME, TYPE_TIME } = environment;

const tokenGen = async (email: string, plainPassword: string, verificationCode: string): Promise<string | boolean> => {  
    try {
        let login: any = false; 
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
        console.log("Error AUTH: ",error);
        return false;
    }
}

const comparePassword = async (password: string, passHashed: string): Promise<boolean> => {
    const result = await bcrypt.compare(password, passHashed);
    return result;
}

export { tokenGen }