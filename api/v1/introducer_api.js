const introducerController = require('../../controller/v1/introducer-controller');
const requestHandler = require('../../server_util/request_handler/request-handler');
const express = require('express');
const bodyParser = require('body-parser');
const introducerApi = express.Router();
introducerApi.use(bodyParser.json());

/*--------------------------------------*/
introducerApi.get('/introducers',requestHandler.isUserAuthenticated,(req,res)=>{
    introducerController.getAllIntroducers()
    .then((response)=>{
        res.json({response:response});
        return;
    });
});
introducerApi.get('/introducers/detail',requestHandler.isUserAuthenticated,(req,res)=>{
    introducerController.getAllIntroducersDetail()
    .then((response)=>{
        res.json({response:response});
        return;
    });
});
module.exports = introducerApi;