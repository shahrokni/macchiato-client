var express = require('express');
const bodyParser = require('body-parser');
var userMessageController = require('../../controller/v1/user-message-controller');
/*---------------------------------------*/
var userMessageApi = express.Router();
userMessageApi.use(bodyParser.json());
/*--------------------------------------*/

function isRequestAuthenticated(user){

    if(!user){

        let response = new global.responseClass();
        response.isSuccessful = false;
        response.serverValidations.push(global.errorResource.ErrBu0017());
        return response;
    }
}

userMessageApi.get('/unreadmessage/count',(req,res)=>{

    let failedResponse = isRequestAuthenticated(req.user);

    if(failedResponse){

        res.json({response:failedResponse});
        return;
    }
    else{

        let userId = req.user._id;
        userMessageController.countUnreadMessages(userId,(response)=>{

            res.json({response:response});
            return;
        });
    }
});

userMessageApi.put('/message/readFlag',(req,res)=>{

    let failedResponse = isRequestAuthenticated(req.user);

    if(failedResponse){

        res.json({response:failedResponse});
        return;
    }
    else{

        let messageId= req.body.messageId;
        let userId = req.user._id;
        userMessageController.setReadFlag(messageId,userId,(response)=>{

            res.json({response:response});
            return;
        });
    }

});

userMessageApi.delete('/message',(req,res)=>{

    let failedResponse = isRequestAuthenticated(req.user);

    if(failedResponse){

        res.json({response:response});
        return;
    }
    else{
       
        let messageId = req.query.messageId;
        let userId = req.user._id;
        userMessageController.deleteUserMessage(messageId,userId,(response)=>{

            res.json({response:response});
            return;
        });
    }

});

userMessageApi.get('/message',(req,res)=>{

    let failedResponse = isRequestAuthenticated(req.user);

    if(failedResponse){

        res.json({response:failedResponse});
        return;
    }
    else{

        let messageId = req.query.ID;
        let userId = req.user._id;
        userMessageController.getMessage(messageId,userId,(response)=>{

            res.json({response:response});
            return;
        });
    }
});

userMessageApi.get('/messages',(req,res)=>{

    let failedResponse = isRequestAuthenticated(req.user);

    if(failedResponse){

        res.json({response:failedResponse});
        return;
    }
    else{
        
        let page = req.query.page;
        let userId = req.user._id;
        userMessageController.getAllUserMessages(userId,page,(response)=>{

            res.json({response:response});
            return;
        });
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