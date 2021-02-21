class UserMessageController {

    constructor(userMessageModel) {
        this.userMessageModel = userMessageModel;
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
}
module.exports = UserMessageController;