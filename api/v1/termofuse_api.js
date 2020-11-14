const termofuseController = require('../../controller/v1/termofuse-controller');
const requestHandler = require('../../server_util/request_handler/request-handler');
/*------------------------------*/
var express = require('express');
const bodyParser = require('body-parser');
/*-------------------------------------------------*/
var termOfUseApi = express.Router();
termOfUseApi.use(bodyParser.json());
/*-------------------------------------------------*/
termOfUseApi.get('/termofuse', requestHandler.isUserAuthenticated, (req, res) => {
    termofuseController.getApplicationTerm()
        .then((response) => {
            res.json({ response: response });
            return;
        })
});

module.exports = termOfUseApi;