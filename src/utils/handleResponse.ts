import { Response } from 'express';
import { HttpResponse } from './dataTypes';

const handleHttpResponse = (res: Response, logResponse: HttpResponse) => {
    const { code, traceCode, status, message, data } = logResponse;
    res.status(code).send({ code, status, traceCode, message, data })
}

export { handleHttpResponse };