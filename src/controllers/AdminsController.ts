import moment from 'moment-timezone';
import models from '../models/index';
import { matchedData } from 'express-validator';
import { handleHttpResponse } from '../utils/handleResponse';
import environment from '../../config/environment';
import { tokenGen } from '../utils/jwtAuth';
import { hashPassword } from '../utils/helpers';
import { Request, Response, AdminHashResponse, AdminData } from '../utils/dataTypes';

const { adminsModel } = models;
const { JWT_VALIDITY_TIME, TYPE_TIME } = environment;

const adminRegister = async (req: Request, res: Response) => {
    try {
        const { email, password } = matchedData(req);
        const { password: hashedPassword, verif_code: verifCode } = await hashPassword(password, "admin") as AdminHashResponse;

        const admins = await adminsModel.find({ email });
        const response = admins.length ? {
            code: 400,
            traceCode: '',
            status: 'Error',
            message: 'The email is already on use.'
        } : {
            code: 200,
            traceCode: '',
            status: 'Success',
            message: 'The user has been registered succesfully.',
            data: await adminsModel.create({ ...matchedData(req), password: hashedPassword, verif_code: verifCode }),
        }

        handleHttpResponse(res, response);
    } catch (er) {
        const response = {
            code: 500,
            traceCode: '',
            status: 'Error',
            message: 'There was an error, try it again or try to contact with the support team.'
        }

        handleHttpResponse(res, response);
    }
}

const fetchAdmins = async ( req: Request, res: Response,) => {
    const data = await adminsModel.find();
    /*console.log(req.userAudit)*/
    try {
        const response = data.length ? {
            code: 200,
            traceCode: '',
            status: 'Success',
            message: 'Information found successfully',
            data: data
        } : {
            code: 400,
            traceCode: '',
            status: 'Error',
            message: 'Information not found.'
        }

        handleHttpResponse(res, response);
    } catch (er) {
        const response = {
            code: 500,
            traceCode: '',
            status: 'Error',
            message: 'There was an error searching the information, try it again or contact with the support team.'
        }

        handleHttpResponse(res, response);
    }
}

const fetchAdminById = async ( req: Request, res: Response,) => {
    try {
        const { id } = matchedData(req);
        const data = await adminsModel.find({ _id: id });
        const response = data.length ? {
            code: 200,
            traceCode: "A-100A",
            status: 'Success',
            message: 'Admin found successfully.',
            data: data
        } : {
            code: 400,
            traceCode: '',
            status: 'Error',
            message: 'Admin not found.'
        }

        handleHttpResponse(res, response);

    } catch (er) {
        const response = {
            code: 500,
            traceCode: '',
            status: 'Error',
            message: 'There was an error searching the Admin, try it again or contact with the support team.'
        }

        handleHttpResponse(res, response);
    }
}

const updateAdmin = async ( req: Request, res: Response,) => {
    try {
        const { email } = matchedData(req);
        const admin = await adminsModel.findOne({ email });

        if (!admin) {
            const { id, name, surname, email, password, rol, user_status } = matchedData(req);
            const updateFields: AdminData = {
                name,
                surname,
                email,
                rol,
                user_status,
                updatedAt: Date.now()
            };

            if (password) {
                const { password: hashedPassword, verif_code: verifCode } = await hashPassword(password, "admin") as AdminHashResponse;
                updateFields.password = hashedPassword;
                updateFields.verif_code = verifCode;
            }

            const response = {
                code: 200,
                traceCode: "B-100A",
                status: 'Success',
                message: 'Admin Updated successfully.',
                data: await adminsModel.findByIdAndUpdate(id, updateFields)
            };

            handleHttpResponse(res, response);
        } else {
            const response = {
                code: 400,
                traceCode: '',
                status: 'Error',
                message: 'Email already in use, please try another one.'
            };

            handleHttpResponse(res, response);
        }
    } catch (error) {
        const response = {
            code: 500,
            traceCode: '',
            status: 'Error',
            message: 'There was an error searching the Admin. Please try again or contact support.'
        };

        handleHttpResponse(res, response);
    }
}

const deleteAdmin = async ( req: Request, res: Response,) => {
    try {
        const { id } = matchedData(req);
        const validateExistence = await adminsModel.findOne({ _id: id });

        if (validateExistence) {
            const response = {
                code: 200,
                traceCode: "A-100A",
                status: 'Success',
                message: 'Admin deleted successfully.',
                data: await adminsModel.delete({ _id: id })
            };

            handleHttpResponse(res, response);
        } else {
            const response = {
                code: 404,
                traceCode: '',
                status: 'Error',
                message: 'Specified user not found or it has been already deleted.'
            };
            handleHttpResponse(res, response);
        }
    } catch (error) {
        console.log(error);
        const response = {
            code: 500,
            traceCode: '',
            status: 'Error',
            message: 'There was an error searching the Admin. Please try again or contact support.'
        };

        handleHttpResponse(res, response);
    }
}

const adminLogin = async (req: Request, res: Response,) => {
    const { email, password, verif_code } = matchedData(req);
    const jwtGen = await tokenGen(email, password, verif_code);

    if (jwtGen) {
        const response = {
            code: 200,
            traceCode: '',
            status: 'Success',
            message: 'JWT generated succesfully.',
            data: {
                JWT: jwtGen,
                validity: ((moment().add(JWT_VALIDITY_TIME, TYPE_TIME).unix() - moment().unix()) / 3600) + ' ' + TYPE_TIME
            }
        }
        await adminsModel.findOneAndUpdate({ email }, { last_connection: Date.now() });

        handleHttpResponse(res, response);
    } else {
        const response = {
            code: 400,
            traceCode: '',
            status: 'Error',
            message: 'Sorry, there was an error logging you, try it again.'
        }
        handleHttpResponse(res, response);
    }
}

export { adminRegister, fetchAdmins, fetchAdminById, updateAdmin, deleteAdmin, adminLogin }