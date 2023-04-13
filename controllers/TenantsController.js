const { matchedData } = require('express-validator');
const { tenantsModel } = require('../models/index');
const { handleHttpResponse } = require("../utils/handleResponse")
const { hashPassword } = require("../utils/helpers");

const tenantRegister = async (req, res) => {
    try {
        const { tenant } = matchedData(req);
        const hashedPass = await hashPassword(tenant.password);

        const response = {
            code: 200,
            status: 'Success',
            traceCode: '',
            message: 'The tenant has been registered succesfully.',
            data: await tenantsModel.create({ ...matchedData(req), 'tenant.password': hashedPass }),
        }

        handleHttpResponse(res, response);

    } catch (er) {
        console.log(er);
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