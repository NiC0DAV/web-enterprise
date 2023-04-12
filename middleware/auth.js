const { matchedData } = require('express-validator');
const { SECRET_JWT_KEY } = require('../config/environment');
const { handleHttpResponse } = require('../utils/handleResponse');
const { adminsModel } = require('../models/index');

const jwtLib = require('jsonwebtoken');
const moment = require('moment-timezone');

const authJwt = async (req, res, next) => {
    const { authorization } = matchedData(req);

    try {
        const decodedToken = await jwtLib.verify(authorization, SECRET_JWT_KEY);

        if (decodedToken.sub) {
            req.userAudit = await userAudit(decodedToken.sub);
            next();
        } else {
            const response = {
                code: 403,
                status: 'Error',
                message: 'Invalid Token.'
            };
            
            handleHttpResponse(res, response);
        }
    } catch (err) {
        const response = {
            code: 403,
            status: 'Error',
            message: 'Admin not authenticated.'
        };

        handleHttpResponse(res, response);
    }
};

const userAudit = async (id) => {
    return await adminsModel.findById(id);
};


module.exports = authJwt;