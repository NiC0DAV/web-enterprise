import { Request, Response, NextFunction } from '../../utils/dataTypes';
import { check, param, header } from 'express-validator';
import { validateResults } from '../../utils/helpers';
import models from '../../models/index';

const { subscriptionsModel, adminsModel } = models;

const createSubscriptionValidation = [
    check(`adm_id`)
        .isMongoId()
        .withMessage({
            traceCode: 'C-101',
            message: `Ups!, there was an error processing the data, try it again or contact the support team.`
        })
        .custom(async admId => {
            return dbConsult('_id', admId, true).then(
                response => !response ? Promise
                    .reject(`Ups!, there was an error processing the data, try it again or contact the support team.`)
                        : Promise.resolve(true)
            );
        }),
    check(`subscription_name`)
        .exists()
        .notEmpty()
        .trim()
        .escape()
        .custom(async subName => {
            return dbConsult('subscription_name', subName).then(
                response => response ? Promise.reject('Subscription Name already in use.') : Promise.resolve(true)
            );
        }),
    check(`subscription_description`)
        .exists()
        .notEmpty()
        .trim()
        .escape(),
    check(`subscription_type`)
        .exists()
        .notEmpty()
        .isNumeric(),
    check(`subscription_time`)
        .exists()
        .notEmpty(),
    check(`subcription_value`)
        .exists()
        .notEmpty()
        .isNumeric(),
    check(`subscription_status`)
        .exists()
        .notEmpty()
        .isNumeric(),
    (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
];

const findByIdValidation = [
    param("id")
        .exists()
        .withMessage({
            traceCode: 'B-100',
            message: `Sorry, we cannot process the request, please validate the data you just entered, id is a mandatory parameter.`
        })
        .isMongoId()
        .withMessage({
            traceCode: 'B-100',
            message: `Sorry, we cannot process the request, please validate the data you just entered, id has to be an identifier.`
        })
        .trim()
        .escape(),
    ( req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
];

const dbConsult = async (field: any, value: string, adm: boolean = false) => {
    let query: any = {};
    query[field] = value;
    return !adm ? await subscriptionsModel.findOne(query) : await adminsModel.findOne(query);
}

export { createSubscriptionValidation, findByIdValidation };