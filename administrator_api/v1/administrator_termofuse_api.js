const adminTermOfUseController = require('../../administrator_controller/v1/administrator_termofuse_controller');
/*---------------------------*/
const bodyParser = require('body-parser');
const express = require('express');
const adminTermOfUseApi = express.Router();
adminTermOfUseApi.use(bodyParser.json());
/*--------------------------*/
module.exports = adminTermOfUseApi;