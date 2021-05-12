/* TODO MUST BE REMOVED AFTER TEST!!!! */
var express = require('express');
const bodyParser = require('body-parser');
const UserMessageAdminController = 
require('../../administrator_controller/v1/administrator_user_message_controller_novel');
const UserMessageModel = require('../../model/user-message/user-message');
var userMessageAdminApi = express.Router();
userMessageAdminApi.use(bodyParser.json());

userMessageAdminApi.post('/message/',(req,res)=>{   
    const message = req.body;  
    const UserMessageController = new 
    UserMessageAdminController(new UserMessageModel());
    UserMessageController.sendMessage(message)
    .then((response)=>{
        res.json({ response: response });
        return;
    })
})

module.exports = userMessageAdminApi;