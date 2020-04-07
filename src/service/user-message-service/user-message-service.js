import Response from '../../communication/entity/response';
import RestProvider from '../../communication/entity/rest-provider';
import ErrorMessages from '../../resource/text/error-message';

export default class UserMessageService { 

    constructor(){

        this.dateUtil = require('../../util/date-util/date-util');
        this.userMessageValidationClass = require('../../')
    }

    getMessages(callBack){

        //TODO
    }

    getMessage(messageId,callBack){

        //TODO
    }

    deleteMessage(messageId,callBack){

        //TODO
    }

    setReadFlag(messageId,callBack){

        //TODO
    }

    countUnreadMessages(callBack){
        
        //TODO
    }

    // TODO THIS METHOD MUST BE ELIMINATED!!!
    addMessageTEST(message,callBack){

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();

        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

        restInstance.post('user_message_api/v1/message',message).then(function (res) {

            let responseUtil = require('../../util/response-util/response-util');
            let serverResponse = responseUtil.extractResponse(res);
            callBack(serverResponse);
        })
            .catch(function (err) {

                response.clientValidations.push(ErrorMessages.Err0000());
                callBack(response);
            });
    }
}