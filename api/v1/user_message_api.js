var express = require('express');
const bodyParser = require('body-parser');
var requestHandler = require('../../server_util/request_handler/request-handler');
const UserMessageController = require('../../controller/v1/user-message-controller');
const UserMessageModel = require('../../model/user-message/user-message');
/*---------------------------------------*/
var userMessageApi = express.Router();
userMessageApi.use(bodyParser.json());
/*--------------------------------------*/
userMessageApi.get('/message/countall', requestHandler.isUserAuthenticated, (req, res) => {
    const userId = req.user._id;
    const userMessageController = new UserMessageController(new UserMessageModel());
    userMessageController.countAll(userId).then((response) => {
        res.json({ response: response });
        return;
    });
});

userMessageApi.put('/message/readFlag',requestHandler.isUserAuthenticated,(req,res)=>{   
    const userId = req.user._id;
    const messageId = req.body.messageId;     
    const userMessageController = new UserMessageController(new UserMessageModel());
    userMessageController.setReadFlag(userId,messageId)
    .then((response)=>{        
        res.json({response:response});
        return;
    })

})

userMessageApi.get('/message/listdata', requestHandler.isUserAuthenticated, (req, res) => {
    const userId = req.user._id;
    const filter = req.query; /*BUG!*/
    const userMessageController = new UserMessageController(new UserMessageModel());
    userMessageController.listMessages(userId, filter,
        { 'title': 1, 'isAdvertisement': 1, 'isRead': 1, 'sentDate': 1, '_id': 1 })
        .then((response) => {
            res.json({ response: response });
            return;
        });
});

userMessageApi.get('/message/', requestHandler.isUserAuthenticated, (req, res) => {
    const userId = req.user._id;
    const messageId = req.query.messageId;
    const userMessageController = new UserMessageController(new UserMessageModel());
    userMessageController.getMessage(userId, messageId)
        .then((response) => {
            res.json({ response: response });
            return;
        });
});

userMessageApi.delete('/message/', requestHandler.isUserAuthenticated, (req, res) => {
    const userId = req.user._id;
    const messageId = req.query.messageId;
    const userMessageController = new UserMessageController(new UserMessageModel());
    userMessageController.deleteMessage(userId, messageId)
        .then((response) => {
            res.json({ response: response });
            return;
        })

});

module.exports = userMessageApi;