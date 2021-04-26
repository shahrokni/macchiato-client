class UserMessageController {

    constructor(userMessageModel) {
        this.userMessageModel = userMessageModel;
    }

    getMessage(userId,messageId){
        return new Promise((resolve)=>{
            const response = {};
            response.serverValidations = [];
            response.operationTimeServer = global.dateUtilModule.getCurrentDateTime();
            this.userMessageModel.getMessage(userId,messageId)
            .then((userMessage)=>{
                response.isSuccessful = true;
                response.outputJson = userMessage;
                resolve(response);
            })
            .catch(()=>{
                response.isSuccessful = false;
                response.serverValidations.push(global.errorResource.Err0000());
                resolve(response);
            })
        })
    }

    countAll(userId) {
        return new Promise((resolve) => {
            const response = {};
            response.serverValidations = [];
            response.operationTimeServer = global.dateUtilModule.getCurrentDateTime();
            this.userMessageModel
                .countAll(userId)
                .then((count) => {
                    response.isSuccessful = true;
                    response.outputJson = count;
                    resolve(response);
                })
                .catch(() => {
                    response.isSuccessful = false;
                    response.serverValidations.push(global.errorResource.Err0000());
                    resolve(response);
                })
        });
    }

    listMessages(userId, filter, projection) {
        return new Promise((resolve) => {
            const response = {};
            response.serverValidations = [];
            response.operationTimeServer = global.dateUtilModule.getCurrentDateTime();             
            this.userMessageModel.listMessages(userId, filter, projection)
                .then((userMessages) => {                   
                    response.isSuccessful = true;
                    response.outputJson = userMessages;
                    resolve(response);
                })
                .catch(() => {
                    response.isSuccessful = false;
                    response.serverValidations.push(global.errorResource.Err0000());
                    resolve(response);
                })
        });
    }

    deleteMessage(userId,messageId){
        return new Promise((resolve)=>{
            const response = {};
            response.serverValidations = [];
            response.operationTimeServer = global.dateUtilModule.getCurrentDateTime();
            this.userMessageModel.deleteMessage(userId,messageId)
            .then(()=>{
                response.isSuccessful = true;
                resolve(response);
            })
            .catch(()=>{
                response.isSuccessful = false;
                response.serverValidations.push(global.errorResource.Err0000());
                resolve(response);
            })
        });
    }
}
module.exports = UserMessageController;