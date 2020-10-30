const termofuseController = require('../../controller/v1/termofuse-controller');
const requestHandler = require('../../server_util/request_handler/request-handler');
/*------------------------------*/
var passport = require('passport');
var express = require('express');
const bodyParser = require('body-parser');
/*-------------------------------------------------*/
var api = express.Router();
api.use(bodyParser.json());
/*-------------------------------------------------*/
api.get('/termofuse', requestHandler.isUserAuthenticated, (req, res) => {
    termofuseController.getApplicationTerm()
        .then((response) => {
            res.json({ response: response });
            return;
        })
})