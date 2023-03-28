const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PORT = process.env.PORT || 3000;
const PUBLIC_FOLDER = process.env.PUBLIC_FOLDER;
const ROUTES_FOLDER = process.env.ROUTES_FOLDER;
const BASE_ROUTE_NAME = process.env.BASE_ROUTE_NAME;

module.exports = { PORT, PUBLIC_FOLDER, ROUTES_FOLDER, BASE_ROUTE_NAME, Schema }