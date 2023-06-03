import { Request, Response, NextFunction } from '../../utils/dataTypes';
import { check, param, header } from 'express-validator';
import { validateResults } from '../../utils/helpers';

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
        })
        .trim()
        .escape(),
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
    ( req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
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
        .normalizeEmail()
        .trim()
        .escape(),
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
    ( req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
];

const deleteAdminValidation = [
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
]

const loginAdminValidation = [
    check("email")
        .exists()
        .notEmpty()
        .withMessage({
            traceCode: 'B-100',
            message: `Sorry, we cannot process the request, please validate the data you just entered, email is a mandatory field.`
        })
        .isEmail()
        .withMessage({
            traceCode: 'B-100',
            message: `Sorry, we cannot process the request, please validate the data you just entered, email has to be a type email data.`
        })
        .normalizeEmail()
        .trim()
        .escape()
    ,
    check("password")
        .exists()
        .notEmpty()
        .isStrongPassword()
        .withMessage({
            traceCode: 'B-100',
            message: `Sorry, we cannot process the request, please validate the data you just entered, password has to be composed:
            min length: 8 characters, at least 1 uppercase, at least 1 number and at least 1 symbol(!,@,#,$,%,&,*,.).`
        })
        .trim(),
    check("verif_code")
        .optional()
        .isHash('sha256')
        .trim()
        .escape(),
    ( req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
];

const jwtAdminValidation = [
    header("Authorization")
        .exists()
        .withMessage({
            traceCode: 'B-103',
            message: `Sorry, we cannot process the request, please validate the data you just entered, Authorization is a mandatory header.`
        })
        .isJWT()
        .withMessage({
            traceCode: 'B-103',
            message: `Sorry, we cannot process the request, please validate the data you just entered, Wrong number of segments.`
        })
        .trim()
        .escape(),
    ( req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
];


export { createAdminValidation, findByIdValidation, updateAdminValidation, deleteAdminValidation, loginAdminValidation, jwtAdminValidation };