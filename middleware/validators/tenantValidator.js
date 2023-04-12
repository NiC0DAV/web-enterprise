const { check, param, header } = require('express-validator');
const { validateResults } = require('../../utils/helpers');

const createAdminValidation = [
    check(`payment_id`)
        .isMongoId()
        .withMessage({
            traceCode: 'C-101',
            message: `Ups!, there was an error processing the data, try it again or contact the support team.`
        }),
    check(`subscription_id`)
        .isMongoId()
        .withMessage({
            traceCode: 'C-101',
            message: `Ups!, there was an error processing the data, try it again or contact the support team.`
        }),
    check(`template_id`)
        .isMongoId()
        .withMessage({
            traceCode: 'C-101',
            message: `Ups!, there was an error processing the data, try it again or contact the support team.`
        }),
    check(`tenant`)
        .exists()
        .notEmpty(),
    check(`tenant.name`)
        .exists()
        .notEmpty()
        .trim()
        .escape(),
    check(`tenant.surname`)
        .exists()
        .notEmpty()
        .trim()
        .escape(),
    check(`tenant.email`)
        .exists()
        .isEmail()
        .normalizeEmail()
        .trim()
        .escape(),
    check(`tenant.country`)
        .exists()
        .notEmpty()
        .trim()
        .escape(),
    check(`tenant.company_name`)
        .exists()
        .notEmpty()
        .trim()
        .escape(),
    check(`tenant.domain_name`)
        .exists()
        .notEmpty()
        .trim()
        .escape(),
    check(`subscription`)
        .exists()
        .notEmpty(),
    check(`subscription.subscription_date`)
        .exists()
        .notEmpty(),
    check(`subscription.subscription_renovationn_date`)
        .exists()
        .notEmpty(),
    
    
    (req, res, next) => validateResults(req, res, next)
];