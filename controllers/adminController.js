const { matchedData } = require('express-validator');
const { adminsModel } = require('../models/index');
const { handleHttpResponse } = require('../utils/handleResponse');

const adminRegister = async (req, res) => { 
    const body = matchedData(req);
    let response = {};
    try {
        const admins = await adminsModel.find({ email: body.email });
        response = admins.length ? {
            code: 400,
            status: 'Error',
            message: 'The email is already on use.'
        } : {
            code: 200,
            status: 'Success',
            message: 'The user has been registered succesfully.',
            data: await adminsModel.create(body),
        }

    } catch (er) {
        response = {
            code: 500,
            status: 'Error',
            message: 'There was an error, try it again or try to contact with the support team.'
        }
    }

    handleHttpResponse(res, {
        code: response.code,
        status: response.status,
        message: response.message,
        data: response.data
    });
}

const fetchAdmins = async (req, res) => {
    let response = {};
    const data = await adminsModel.find();
    try {
        response = data.length ? {
            code: 200,
            status: 'Success',
            message: 'Information found successfully',
            data: data
        } : {
            code: 400,
            status: 'Error',
            message: 'Information not found.'
        }   
    } catch (er) {
        response = {
            code: 500,
            status: 'Error',
            message: 'There was an error searching the information, try it again or contact with the support team.'
        }
    }

    handleHttpResponse(res, {
        code: response.code,
        status: response.status,
        message: response.message,
        data: response.data
    });
}

const fetchAdminById = async (req, res) => {
    let response = {};
    try {
        const { id } = matchedData(req);
        const data = await adminsModel.find({_id: id});
        response = data.length ? {
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
    } catch (er) {
        response = {
            code: 500,
            status: 'Error',
            message: 'There was an error searching the Admin, try it again or contact with the support team.'
        }
    }

    handleHttpResponse(res, {
        code: response.code,
        status: response.status,
        message: response.message,
        data: response.data
    });
}

const updateAdmin = async (req, res) => { 
    let response = {};
    let adminUpdate = {};
    
    try {
        const {id, nombres, surname, email, password, verif_code, rol, user_status} = matchedData(req)
        const admins = await adminsModel.find({ email: body.email });
        if (!admins.length) {
            if (password) {
                adminUpdate = await cliente.findByIdAndUpdate({ _id: id }, {
                    name: data.nombres,
                    surname: data.surname,
                    email: data.email,
                    password: data.password,
                    verif_code: data.verif_code,
                    rol: data.rol,
                    user_status: data.user_status,
                    updatedAt: Date.now
                });
            } else {
                adminUpdate = await cliente.findByIdAndUpdate({ _id: id }, {
                    name: data.nombres,
                    surname: data.surname,
                    email: data.email,
                    rol: data.rol,
                    user_status: data.user_status,
                    updatedAt: Date.now
                });
            }

            response = {
                code: 200,
                traceCode: "B-100A",
                status: 'Success',
                message: 'Admin Updated successfully.',
                data: adminUpdate
            }
        } else {
            response = {
                code: 400,
                status: 'Error',
                message: 'Email already on use, try another one.'
            } 
        }

    } catch (er) {
        response = {
            code: 500,
            status: 'Error',
            message: 'There was an error searching the Admin, try it again or contact with the support team.'
        }
    }

    handleHttpResponse(res, {
        code: response.code,
        status: response.status,
        message: response.message,
        data: response.data
    });
}

module.exports = { adminRegister, fetchAdmins, fetchAdminById }