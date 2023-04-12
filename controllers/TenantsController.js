const { matchedData } = require('express-validator');
const { tenantsModel } = require('../models/index');
const { handleHttpResponse } = require("../utils/handleResponse")

const tenantRegister = (req, res) => {

    try {
                
    } catch (er) {
        const response = {
            code: 500,
            traceCode: '',
            status: 'Error',
            message: 'There was an error processing the request, contact with the support team or try it again.'
        }

        handleHttpResponse(res, response);
    }
}

module.exports = { tenantRegister };