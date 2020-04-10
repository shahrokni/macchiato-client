import Response from '../../communication/entity/response';
import RestProvider from '../../communication/entity/rest-provider';
import ErrorMessages from '../../resource/text/error-message';

export default class UserMessageService {

    constructor() {

        this.dateUtil = require('../../util/date-util/date-util');
    }

    getAllMessages(page, callBack) {

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();

        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

        restInstance.get('user_message_api/v1/messages',
            { params: { page: page } })
            .then(function (res) {

                let responseUtil = require('../../util/response-util/response-util');
                let serverResponse = responseUtil.extractResponse(res);
                callBack(serverResponse);
            })
            .catch(function (err) {

                response.clientValidations.push(ErrorMessages.Err0000());
                callBack(response);
            });
    }

    getMessage(messageId, callBack) {

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();

        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

        restInstance.get('user_message_api/v1/message?ID=' + messageId).then(function (res) {

            let responseUtil = require('../../util/response-util/response-util');
            let serverResponse = responseUtil.extractResponse(res);
            callBack(serverResponse);
        })
            .catch(function (err) {

                response.clientValidations.push(ErrorMessages.Err0000());
                callBack(response);
            });
    }

    deleteMessage(messageId, callBack) {

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();
        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

        restInstance.delete('user_message_api/v1/message', {params:{ messageId: messageId }}).then(function (res) {

            let responseUtil = require('../../util/response-util/response-util');
            let serverResponse = responseUtil.extractResponse(res);
            callBack(serverResponse);
        })
            .catch(function (err) {

                response.clientValidations.push(ErrorMessages.Err0000());
                callBack(response);
            });
    }

    setReadFlag(messageId, callBack) {

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();

        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

        restInstance.put('user_message_api/v1/message/readFlag', { messageId: messageId }).then(function (res) {

            let responseUtil = require('../../util/response-util/response-util');
            let serverResponse = responseUtil.extractResponse(res);
            callBack(serverResponse);
        })
            .catch(function (err) {

                response.clientValidations.push(ErrorMessages.Err0000());
                callBack(response);
            });
    }

    countUnreadMessages(callBack) {

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();

        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

        restInstance.get('user_message_api/v1/unreadmessage/count').then(function (res) {

            let responseUtil = require('../../util/response-util/response-util');
            let serverResponse = responseUtil.extractResponse(res);
            callBack(serverResponse);
        })
            .catch(function (err) {               

                response.clientValidations.push(ErrorMessages.Err0000());
                callBack(response);
            });
    }

    // TODO THIS METHOD MUST BE ELIMINATED!!!
    addMessageTEST(message, callBack) {

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();

        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

        restInstance.post('user_message_api/v1/message', message).then(function (res) {

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