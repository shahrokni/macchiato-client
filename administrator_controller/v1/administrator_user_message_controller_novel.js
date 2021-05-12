class UserMessageAdminController{
    constructor(userMessageModel){
        this.userMessageModel = userMessageModel;
    }
    sendMessage(message){
        return new Promise((resolve)=>{
            const response = {};
            response.serverValidations = [];
            response.operationTimeServer = global.dateUtilModule.getCurrentDateTime();

            this.userMessageModel.save(message)
            .then((savedMessage)=>{
                response.isSuccessful = true;
                response.outputJson = savedMessage;
                resolve(response);
            })
            .catch((err)=>{           
                cosnole.log(err);
                response.isSuccessful = false;
                response.serverValidations.push(global.errorResource.Err0000());
                resolve(response);
            })
        })
    }
}
module.exports = UserMessageAdminController;