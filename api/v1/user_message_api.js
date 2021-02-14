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

userMessageApi.get('/message/listdata', requestHandler.isUserAuthenticated, (req, res) => {
    const userId = req.user._id;
    const filter = req.params;
    const userMessageController = new UserMessageController(new UserMessageModel());
    userMessageController.listMessages(userId, filter).then((response) => {
        res.json({ response: response });
        return;
    });
});

module.exports = userMessageApi;