var express = require('express');
const bodyParser = require('body-parser');
var userMessageController = require('../../controller/v1/user-message-controller');
/*---------------------------------------*/
var userMessageApi = express.Router();
userMessageApi.use(bodyParser.json());
/*--------------------------------------*/

function isRequestAuthenticated(user){

    if(!user){

    }
}

userMessageApi.get('/messages',(req,res)=>{

    if(!isRequestAuthenticated(req.user)){

    }
    else{
        
    }
});

// TODO: THIS FUNCTION MUST BE ELIMINATED!!!
userMessageApi.post('/message', (req, res) => {

    userMessageController.saveUserMessage(req.body,(response)=>{

        res.json({response:response});
        return;
    });
});


module.exports = userMessageApi;