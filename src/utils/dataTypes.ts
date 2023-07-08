import { ObjectId } from 'mongodb';
import { Request, Response, NextFunction } from 'express';

type MongoId = ObjectId;
type CrudProcess = 'Create' | 'Update' | 'Find' | 'FindById' | 'Delete'; 

// Interfaces
interface CustomRequestAuth extends Request {
    userAudit?: any;
}

interface HttpResponse { 
    code: number;
    traceCode: string;
    status: string;
    message: string;
    data?: any;
}

interface AdminHashResponse {
    password: string;
    verif_code: string;
}

interface AdminData {
    name: string;
    surname: string;
    email: string;
    rol: string;
    user_status: string;
    updatedAt: number;
    password?: string;
    verif_code?: string;
}

export { MongoId, CustomRequestAuth, Request, Response, NextFunction, HttpResponse, AdminHashResponse, AdminData, CrudProcess }