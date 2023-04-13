const mongoose = require('mongoose');

const environment = {
    mongoose: mongoose,
    Connect: mongoose.connect,
    Schema: mongoose.Schema,
    PORT: process.env.PORT || 3000,
    PUBLIC_FOLDER: process.env.PUBLIC_FOLDER,
    ROUTES_FOLDER: process.env.ROUTES_FOLDER,
    BASE_ROUTE_NAME: process.env.BASE_ROUTE_NAME,
    DB_URI: process.env.DB_URI,
    LOCAL_DB_URI: process.env.LOCAL_DB_URI,
    SECRET_ADMIN: process.env.SECRET_ADMIN,
    SECRET_JWT_KEY: process.env.SECRET_JWT_KEY,
    JWT_VALIDITY: process.env.JWT_VALIDITY,
    JWT_VALIDITY_TIME: process.env.JWT_VALIDITY_TIME,
    TYPE_TIME: process.env.TYPE_TIME,
    SLACK_WEBHOOK: process.env.SLACK_WEBHOOK
}

module.exports = environment;