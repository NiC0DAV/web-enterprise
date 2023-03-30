const { matchedData } = require('express-validator');
const { adminsModel } = require('../models/index');
const { handleHttpResponse } = require('../utils/handleResponse');

const adminRegister = async (req, res) => {
    const body = matchedData(req);

    try {
        const admins = await adminsModel.find({ email: body.email });
        const response = admins.length ? {
            code: 400,
            status: 'Error',
            message: 'The email is already on use.'
        } : {
            code: 200,
            status: 'Success',
            message: 'The user has been registered succesfully.',
            data: await adminsModel.create(body),
        }
        
        handleHttpResponse(res, response);
    } catch (er) {
        const response = {
            code: 500,
            status: 'Error',
            message: 'There was an error, try it again or try to contact with the support team.'
        }

        handleHttpResponse(res, response);
    }
}

const fetchAdmins = async (req, res) => {
    const data = await adminsModel.find();
    try {
        const response = data.length ? {
            code: 200,
            status: 'Success',
            message: 'Information found successfully',
            data: data
        } : {
            code: 400,
            status: 'Error',
            message: 'Information not found.'
        }

        handleHttpResponse(res, response);
    } catch (er) {
        const response = {
            code: 500,
            status: 'Error',
            message: 'There was an error searching the information, try it again or contact with the support team.'
        }

        handleHttpResponse(res, response);
    }
}

const fetchAdminById = async (req, res) => {
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
            status: 'Error',
            message: 'Admin not found.'
        }

        handleHttpResponse(res, response);

    } catch (er) {
        const response = {
            code: 500,
            status: 'Error',
            message: 'There was an error searching the Admin, try it again or contact with the support team.'
        }
    }

    handleHttpResponse(res, response);
}

const updateAdmin = async (req, res) => {
    try {
        const { email } = matchedData(req);
        const admin = await adminsModel.findOne({ email });

        if (!admin) {
            const { id, name, surname, email, password, verif_code, rol, user_status } = matchedData(req);
            const updateFields = {
                name,
                surname,
                email,
                rol,
                user_status,
                updatedAt: Date.now()
            };

            if (password) {
                updateFields.password = password;
                updateFields.verif_code = verif_code;
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
                status: 'Error',
                message: 'Email already in use, please try another one.'
            };

            handleHttpResponse(res, response);
        }
    } catch (error) {
        const response = {
            code: 500,
            status: 'Error',
            message: 'There was an error searching the Admin. Please try again or contact support.'
        };

        handleHttpResponse(res, response);
    }
}


module.exports = { adminRegister, fetchAdmins, fetchAdminById, updateAdmin }