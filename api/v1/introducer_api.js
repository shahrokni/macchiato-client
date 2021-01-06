const introducerController = require('../../controller/v1/introducer-controller');
const requestHandler = require('../../server_util/request_handler/request-handler');
const express = require('express');
const bodyParser = require('body-parser');
const introducerApi = express.Router();
introducerApi.use(bodyParser.json());
/*--------------------------------------*/
introducerApi.get('/introducers',async (req,res)=>{
    await introducerController.getAllIntroducers(false)
    .then((response)=>{
        res.json({response:response});
        return;
    });
});
//TODO: This mtehod mus be placed in Administrator API!!!!
introducerApi.get('/introducers/detail',requestHandler.isUserAuthenticated, async (req,res)=>{
    await introducerController.getAllIntroducers(true)
    .then((response)=>{
        res.json({response:response});
        return;
    });
});
module.exports = introducerApi;