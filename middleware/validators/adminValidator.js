const { check, param } = require('express-validator');
const { validateResults } = require('../../utils/helpers');

const createAdminValidation = [
    check(`admin_id`)
        .isMongoId()
        .withMessage({
            traceCode: 'C-101',
            message: `Ups!, there was an error processing the data, try it again or contact the support team.`
        }),
    check(`name`)
        .exists()
        .notEmpty()
        .withMessage({
            traceCode: 'B-100',
            message: `Sorry, we cannot process the request, please validate the data you just entered, name is a mandatory field.`
        })
        .trim()
        .escape(),
    check(`surname`)
        .trim()
        .escape(),
    check(`email`)
        .exists()
        .notEmpty()
        .withMessage({
            traceCode: 'B-100',
            message: `Sorry, we cannot process the request, please validate the data you just entered, email is a mandatory field.`
        })
        .isEmail()
        .normalizeEmail()
        .withMessage({
            traceCode: 'B-100',
            message: `Sorry, we cannot process the request, please validate the data you just entered, email has to be a type email data.`
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
    check(`verif_code`)
        .exists()
        .withMessage({
            traceCode: 'B-100',
            message: `Sorry, we cannot process the request, please validate the data you just entered, verif_code is a mandatory field.`
        })
        .notEmpty()
        .withMessage({
            traceCode: 'B-100',
            message: `Sorry, we cannot process the request, please validate the data you just entered, verif_code is a mandatory field.`
        })
        .trim()
        .isHash('sha256')
        .withMessage({
            traceCode: 'B-100',
            message: `Sorry, we cannot process the request, please validate the data you just entered, verif_code has to be in SHA-256.`
        })
        ,
    (req, res, next) => validateResults(req, res, next)
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
    (req, res, next) => validateResults(req, res, next)
];

const updateAdminValidation = [
    param("id")
        .exists()
        .withMessage({
            traceCode: 'B-100',
            message: `Sorry, we cannot process the request, please validate the data you just entered, id is a mandatory parameter.`
        }),
    check("name")
        .optional()
        .trim()
        .escape(),
    check("surname")
        .optional()
        .trim()
        .escape(),
    check("email")
        .optional()
        .isEmail()
        .normalizeEmail(),
    check("password")
        .optional()
        .trim()
        .isStrongPassword()
        .withMessage({
            traceCode: 'B-100',
            message: `Sorry, we cannot process the request, please validate the data you just entered, password has to be composed:
            min length: 8 characters, at least 1 uppercase, at least 1 number and at least 1 symbol(!,@,#,$,%,&,*,.).`
        }),
    check("verif_code")
        .optional()
        .trim()
        .escape()
        .isHash('sha256'),
    check("rol")
        .optional()
        .trim()
        .escape(),
    check("user_status")
        .optional()
        .trim()
        .escape(),
    (req, res, next) => validateResults(req, res, next)
];



module.exports = { createAdminValidation, findByIdValidation, updateAdminValidation };