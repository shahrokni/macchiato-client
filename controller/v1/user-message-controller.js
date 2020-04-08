function saveUserMessage(userMessage,done){   
    
    let response = new global.responseClass();

    response.isSuccessful = false;
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    let UserMessage = require('../../model/user-message/user-message');
    let newUserMessage = new UserMessage({

        senderId: userMessage.senderId,
        receiverId: userMessage.receiverId,
        sentDate: userMessage.sentDate,
        isRead: userMessage.isRead,
        title: userMessage.title,
        text: userMessage.text
    });

    newUserMessage.save(function (saveErr, userMessage) {

        if (!saveErr) {

            response.isSuccessful = true;
            response.outputJson = userMessage;
            done(response);
        }
        else {

            let message = global.dbExceptionHandler.tryGetErrorMessage(saveErr);

            if (message != null)
                response.serverValidations.push(message);
            else
                response.serverValidations.push(global.errorResource.Err0000());

            done(response);
        }
    });
}

module.exports.saveUserMessage = saveUserMessage;