'use strict'
require("dotenv").config();
const morganBody = require("morgan-body");
const express = require('express');
const cors = require('cors');
const dbConnection = require('./config/mongo');
const bodyParser = require('body-parser');

const { PORT, PUBLIC_FOLDER, ROUTES_FOLDER, BASE_ROUTE_NAME, SLACK_WEBHOOK } = require('./config/environment');
const { loggerStream } = require('./utils/helpers');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(cors());

morganBody(app, {
    stream: loggerStream,
    skip: function (req, res) {
        return res.statusCode < 400;
    }
});

app.use(express.static(PUBLIC_FOLDER));
app.use(BASE_ROUTE_NAME, require(ROUTES_FOLDER));

app.listen(PORT, () => console.log(`App corriendo en http//:localhost:${PORT}`));

dbConnection();