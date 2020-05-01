var UserMessage = require('../../model/user-message/user-message');
/*-------------------EXPOSED FUNCTION--------------------------*/
async function sendInitialMessage(userId,sessionOption){

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
    let userMessage = new UserMessage();
    userMessage.senderId = 'Administrator';
    userMessage.receiverId = userId;
    userMessage.sentDate = Date.now();
    userMessage.title = global.systemMessages.welcomeTitle;
    userMessage.text =  global.systemMessages.welcomeMessage;
    
    await userMessage.save(sessionOption);    
    return Promise.resolve();
}
module.exports.sendInitialMessage = sendInitialMessage;

async function sendMessage(message){

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    let userMessage = new UserMessage();
    userMessage.senderId = message.senderId;
    userMessage.receiverId = message.receiverId;
    userMessage.sentDate = message.sentDate;
    userMessage.title = message.title;
    userMessage.text = message.text;

    userMessage.save()
    .then((savedMessage)=>{

        response.isSuccessful = true;
        response.outputJson = savedMessage;
        return Promise.resolve(response);
    })
    .catch((saveException)=>{

        response.isSuccessful = false;
        response.serverValidations.push(global.errorResource.Err0000());
        return Promise.resolve(response);
    });        
}
module.exports.sendMessage = sendMessage; 