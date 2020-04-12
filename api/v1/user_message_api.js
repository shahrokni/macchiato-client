var express = require('express');
const bodyParser = require('body-parser');
var requestHandler = require('../../server_util/request_handler/request-handler');
var userMessageController = require('../../controller/v1/user-message-controller');
/*---------------------------------------*/
var userMessageApi = express.Router();
userMessageApi.use(bodyParser.json());
/*--------------------------------------*/

userMessageApi.get('/unreadmessage/count', requestHandler.isUserAuthenticated, (req, res) => {

    let userId = req.user._id;
    userMessageController.countUnreadMessages(userId, (response) => {

        res.json({ response: response });
        return;
    });

});

userMessageApi.put('/message/readFlag', requestHandler.isUserAuthenticated, (req, res) => {

    let messageId = req.body.messageId;
    let userId = req.user._id;
    userMessageController.setReadFlag(messageId, userId, (response) => {

        res.json({ response: response });
        return;
    });


});

userMessageApi.delete('/message', requestHandler.isUserAuthenticated, (req, res) => {

    let messageId = req.query.messageId;
    let userId = req.user._id;
    userMessageController.deleteUserMessage(messageId, userId, (response) => {

        res.json({ response: response });
        return;
    });


});

userMessageApi.get('/message', requestHandler.isUserAuthenticated, (req, res) => {

    let messageId = req.query.ID;
    let userId = req.user._id;
    userMessageController.getMessage(messageId, userId, (response) => {

        res.json({ response: response });
        return;
    });

});

userMessageApi.get('/messages', requestHandler.isUserAuthenticated, (req, res) => {

    let page = req.query.page;
    let userId = req.user._id;
    userMessageController.getAllUserMessages(userId, page, (response) => {

        res.json({ response: response });
        return;
    });

});

// TODO: THIS FUNCTION MUST BE ELIMINATED!!!
userMessageApi.post('/message', (req, res) => {

    userMessageController.saveUserMessage(req.body, (response) => {

        res.json({ response: response });
        return;
    });
});


module.exports = userMessageApi;