import { matchedData } from 'express-validator';
import environment from '../../config/environment';
import { handleHttpResponse } from '../../src/utils/handleResponse';
import models from '../../src/models/index';
import jwtLib from 'jsonwebtoken';
import { MongoId, CustomRequestAuth, Response, NextFunction } from '../../src/utils/dataTypes';
import { ObjectId } from 'mongodb';

const { SECRET_JWT_KEY } = environment;
const { adminsModel } = models;

const authJwt = async (req: CustomRequestAuth , res: Response, next: NextFunction) => {
    const { authorization } = matchedData(req);

    try {
        const decodedToken = await jwtLib.verify(authorization, SECRET_JWT_KEY);

        if (decodedToken.sub) {
            const userId: MongoId = new ObjectId(decodedToken.sub as string);
            req.userAudit = await userAudit(userId);
            next();
        } else {
            const response = {
                code: 403,
                traceCode: 'L120',
                status: 'Error',
                message: 'Invalid Token.'
            };
            
            handleHttpResponse(res, response);
        }
    } catch (err) {
        const response = {
            code: 403,
            traceCode: 'L120',
            status: 'Error',
            message: 'Admin not authenticated.'
        };

        handleHttpResponse(res, response);
    }
};

const userAudit = async (id: MongoId) => {
    return await adminsModel.findById(id);
};


export default authJwt;