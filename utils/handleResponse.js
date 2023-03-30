const handleHttpResponse = (res, { code, traceCode = '',status = '', message, data = {} }) => {
    res.status(code).send({code, status, traceCode, message, data})
}

module.exports = { handleHttpResponse };