const { matchedData } = require('express-validator');
const { SECRET_JWT_KEY } = require('../config/environment');
const { handleHttpResponse } = require('../utils/handleResponse');

const jwtLib = require('jsonwebtoken');
const moment = require('moment-timezone');

const authJwt = (req, res, next) => {
    const { authorization } = matchedData(req);
    const jwt = jwtLib.verify(authorization, SECRET_JWT_KEY, (err, decodedToken) => {
        if (err) {
            const response = {
                code: 403,
                status: 'Error',
                message: 'Admin not authenticated.'
            }
            handleHttpResponse(res, response);
        } else {
            next();
        }
    });
}

module.exports = authJwt;