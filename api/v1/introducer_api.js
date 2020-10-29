const introducerController = require('../../controller/v1/introducer-controller');
const requestHandler = require('../../server_util/request_handler/request-handler');
const express = require('express');
const bodyParser = require('body-parser');
const api = express.Router();
api.use(bodyParser.json());

/*--------------------------------------*/
api.get('/introducers',requestHandler.isUserAuthenticated,(req,res)=>{
    introducerController.getAllIntroducers()
    .then((response)=>{
        res.json({response:response});
        return;
    });
});
api.get('/introducers/detail',requestHandler.isUserAuthenticated,(req,res)=>{
    introducerController.getAllIntroducersDetail()
    .then((response)=>{
        res.json({response:response});
        return;
    });
});
api.post('/introducer',requestHandler.isUserAuthenticated,(req,res)=>{
    introducerController.addIntroducer((response)=>{
        res.json({response:response});
        return;
    })
})