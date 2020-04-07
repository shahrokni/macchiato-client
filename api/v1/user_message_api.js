var express = require('express');
const bodyParser = require('body-parser');
/*---------------------------------------*/
var userMessageApi = express.Router();
userMessageApi.use(bodyParser.json());
/*-----------FUNCTIONS--------------*/

// TODO: THIS FUNCTION MUST BE ELIMINATED!!!
userMessageApi.post('/message', (req, res) => {

    
    console.log(global.responseClass);
    let response = new global.responseClass();

    response.isSuccessful = false;
    response.operationTimestamp = this.dateUtilModule.getCurrentDateTime();

    let UserMessage = require('../../model/user-message/user-message');
    let newUserMessage = new UserMessage({

        senderId: req.body.senderId,
        receiverId: req.body.receiverId,
        sentDate: req.body.sentDate,
        isRead: req.body.isRead,
        title: req.body.title,
        text: req.body.text
    });

    newUserMessage.save(function (saveErr, userMessage) {

        if (!saveErr) {

            response.isSuccessful = true;
            response.outputJson = userMessage;
            res.json({ response: response });
            return;
        }
        else {

            let message = this.dbExceptionHandler.tryGetErrorMessage(saveErr);

            if (message != null)
                response.serverValidations.push(message);
            else
                response.serverValidations.push(this.errorResource.Err0000());

            res.json({ response: response });
            return;
        }
    });
});

module.exports = userMessageApi;