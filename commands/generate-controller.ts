import * as fs from "fs";

const controllerName = process.argv[2];

if (!controllerName) {
    console.error("Please specify the name of the controller, please avoid using the word Controller.");
    process.exit(1);
}

const controllerContent = `
import { matchedData } from 'express-validator';
import models from '../models/index';
import { handleHttpResponse } from '../utils/handleResponse';
import { hashPassword } from '../utils/helpers';
import { Request, Response } from '../utils/dataTypes';

const { ${controllerName} } = models;

/**
 *  Write all your code down here.
 */

module.exports = {  };
`;

fs.writeFile(`src/controllers/${controllerName.charAt(0).toUpperCase() + controllerName.slice(1)}Controller.ts`, controllerContent, (err) => {
    if (err) {
        console.error("There was an error creating the controller:", err);
    } else {
        console.log(`The controller ${controllerName} has been created succesfully.`);
    }
});
