import { matchedData } from 'express-validator';
import models from '../models/index';
import { handleHttpResponse } from '../utils/handleResponse';
import { hashPassword } from '../utils/helpers';
import { Request, Response } from '../utils/dataTypes';

const { subscriptionsModel } = models;

const createSubscription = async (req: Request, res: Response) => { 
    try {
        const subscriptionData = matchedData(req);
        const response = {
            code: 200,
            status: 'Success',
            traceCode: '',
            message: 'The subscription has been registered succesfully.',
            data: await subscriptionsModel.create(subscriptionData),
        }
        return handleHttpResponse(res, response);
    } catch (error) {
        const response = {
            code: 500,
            traceCode: '',
            status: 'Error',
            message: 'There was an error processing the request, contact with the support team or try it again.'
        }
        return handleHttpResponse(res, response);
    }
}

const fetchSubscriptions = async ( req: Request, res: Response,) => {
    const data = await subscriptionsModel.find();

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

const fetchSubscriptionsById = async ( req: Request, res: Response,) => {
    try {
        const { id } = matchedData(req);
        const data = await subscriptionsModel.find({ _id: id });
        const response = data.length ? {
            code: 200,
            traceCode: "A-100A",
            status: 'Success',
            message: 'Subscription found successfully.',
            data: data
        } : {
            code: 400,
            traceCode: '',
            status: 'Error',
            message: 'Subscription not found.'
        }

        handleHttpResponse(res, response);

    } catch (er) {
        const response = {
            code: 500,
            traceCode: '',
            status: 'Error',
            message: 'There was an error searching the subscription, try it again or contact with the support team.'
        }

        handleHttpResponse(res, response);
    }
}

export { createSubscription, fetchSubscriptions, fetchSubscriptionsById }