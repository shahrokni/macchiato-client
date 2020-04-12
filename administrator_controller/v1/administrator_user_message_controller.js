var UserMessage = require('../../model/user-message/user-message');
/*-------------------EXPOSED FUNCTION--------------------------*/
function sendMessage(message,done){

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    let userMessage = new UserMessage();
    userMessage.senderId = message.senderId;
    userMessage.receiverId = message.receiverId;
    userMessage.sentDate = message.sentDate;
    userMessage.title = message.title;
    userMessage.text = message.text;

    userMessage.save((saveErr,sentMessage)=>{

        if(!saveErr){

            response.isSuccessful = true;
            response.outputJson = sentMessage;
            done(response);
        }
        else{

            response.isSuccessful = false;
            response.serverValidations.push(global.errorResource.Err0000());
            done(response);
        }
    });
}
module.exports.sendMessage = sendMessage; 