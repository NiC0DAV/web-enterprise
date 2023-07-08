
import { matchedData } from 'express-validator';
import models from '../models/index';
import { handleHttpResponse } from '../utils/handleResponse';
import { hashPassword } from '../utils/helpers';
import { Request, Response } from '../utils/dataTypes';

const { templatesModel } = models;

const tenantRegister = async (req: Request, res: Response) => {
    try {
        const { tenant } = matchedData(req);
        const hashedPass = await hashPassword(tenant.password);

        const response = {
            code: 200,
            status: 'Success',
            traceCode: '',
            message: 'The tenant has been registered succesfully.',
            data: await templatesModel.create({ ...matchedData(req), 'tenant.password': hashedPass }),
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


module.exports = {  };
