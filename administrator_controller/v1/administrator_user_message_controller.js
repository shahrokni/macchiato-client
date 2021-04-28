/*-------------------EXPOSED FUNCTION--------------------------*/
const administrator = 'Administrator';

function sendInitialMessage(userId, sessionOption) {
    return new Promise((resolve,reject) => {
        const userMessageModel = require('../../model/user-message/user-message');
        const model = new userMessageModel();
        let response = new global.responseClass();
        response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
        model.saveBySessionId({
            senderId: administrator,
            receiverId: userId,
            sentDate: Date.now(),
            title: global.systemMessages.welcomeTitle,
            text: global.systemMessages.welcomeMessage,
            isAdvertisement: false
        }, sessionOption).then((savedUserMessage) => {
            response.isSuccessful = true;
            response.outputJson = savedUserMessage
            resolve(response);
        }).catch((err) => {
            //TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
            // response.isSuccessful = false;
            // response.serverValidations.push(global.errorResource.Err0000());
            // resolve(response);
            reject(err);
        })
    })
}
module.exports.sendInitialMessage = sendInitialMessage;

function sendMessage(message) {
    return new Promise((resolve) => {
        const userMessageModel = require('../../model/user-message/user-message');
        const model = new userMessageModel();
        let response = new global.responseClass();
        response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
        model.save({
            senderId: message.senderId,
            receiverId: message.receiverId,
            sentDate: message.sentDate,
            title: message.title,
            text: message.text,
            isAdvertisement: message.isAdvertisement
        }).then((savedUserMessage) => {
            response.isSuccessful = true;
            response.outputJson = savedUserMessage
            resolve(response);
        }).catch(() => {
            response.isSuccessful = false;
            response.serverValidations.push(global.errorResource.Err0000());
            resolve(response);
        })
    });

}
module.exports.sendMessage = sendMessage; 