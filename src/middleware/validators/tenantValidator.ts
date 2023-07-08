import { Request, Response, NextFunction } from '../../utils/dataTypes';
import { check, param, header } from 'express-validator';
import { validateResults } from '../../utils/helpers';
import models from '../../models/index';

const { tenantsModel } = models;

const createAdminValidation = [
    check(`tenant`)
        .exists()
        .notEmpty(),
    check(`name`)
        .exists()
        .notEmpty()
        .trim()
        .escape(),
    check(`surname`)
        .exists()
        .notEmpty()
        .trim()
        .escape(),
    check(`email`)
        .exists()
        .isEmail()
        .normalizeEmail()
        .trim()
        .escape()
        .custom(email => {
            return dbConsult('tenant.email', email).then(
                response => response ? Promise.reject('Email already in use.') : Promise.resolve(true)
            );
        }),
    check(`password`)
        .exists()
        .notEmpty()
        .withMessage({
            traceCode: 'B-100',
            message: `Sorry, we cannot process the request, please validate the data you just entered, password is a mandatory field.`
        })
        .trim()
        .isStrongPassword()
        .withMessage({
            traceCode: 'B-100',
            message: `Sorry, we cannot process the request, please validate the data you just entered, password has to be composed:
        min length: 8 characters, at least 1 uppercase, at least 1 number and at least 1 symbol(!,@,#,$,%,&,*,.).`
        }),
    check(`country`)
        .exists()
        .notEmpty()
        .trim()
        .escape(),
    check(`company_name`)
        .exists()
        .notEmpty()
        .trim()
        .escape()
        .custom(companyName => {
            return dbConsult('tenant.company_name', companyName).then(
                response => response ? Promise.reject('The name of the company already exists.') : Promise.resolve(true)
            );
        }),
    check(`domain_name`)
        .exists()
        .notEmpty()
        .trim()
        .escape(),
    check(`template_id`)
        .isMongoId()
        .withMessage({
            traceCode: 'C-101',
            message: `Ups!, there was an error processing the data, try it again or contact the support team.`
        }),
    check(`service_id`)
        .isMongoId()
        .withMessage({
            traceCode: 'C-101',
            message: `Ups!, there was an error processing the data, try it again or contact the support team.`
        }),

    (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
];

const dbConsult = async (field: any, value: string) => {
    let query: any = {};
    query[field] = value;
    return await tenantsModel.findOne(query);
}

export { createAdminValidation };