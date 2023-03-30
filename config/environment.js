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
    LOCAL_DB_URI: process.env.LOCAL_DB_URI
}

module.exports = environment;