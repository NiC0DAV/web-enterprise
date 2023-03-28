'use strict'
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const dbConnection = require('./config/mongo');
const { PORT, PUBLIC_FOLDER, ROUTES_FOLDER, BASE_ROUTE_NAME } = require('./config/environment');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use(cors());

app.use(express.static(PUBLIC_FOLDER));

app.use(BASE_ROUTE_NAME, require(ROUTES_FOLDER));

app.listen(PORT, () => console.log(`App corriendo en http//:localhost:${PORT}`));

dbConnection();