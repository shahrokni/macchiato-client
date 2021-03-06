function extractResponse(obj) {

    let errorResource = require('../../resource/text/error-message');
    let dateUtil = require('../date-util/date-util');

    let ResponseClass = require('../../communication/entity/response');
    let response = new ResponseClass();
    response.isSuccessful = false;
    response.operationTimestamp = dateUtil.getCurrentDateTime();
    response.clientValidations = errorResource.Err0000();

    if ('data' in obj) {

        let data = obj['data'];

        if ('response' in data) {

            let response = data['response'];
            return response;
        }
        else {

            return response;
        }
    }
    else {

        return response;
    }
}
module.exports.extractResponse = extractResponse;

function isAuthenticated(serverResponse) {

    let errorResource = require('../../resource/text/error-message');
    let authenticationStateObj = require('../../entity/global/authentication-state');
    let authenticationState = authenticationStateObj.AuthenticationState;
    
    if (serverResponse.isSuccessful === false) {

        if (serverResponse.serverValidations) {

            if (serverResponse.serverValidations[0] === errorResource.ErrBu0017()) {
                  
                return authenticationState.NotAuthenticated;
            }
            else if(serverResponse.clientValidations[0] === errorResource.Err0000()){
                
                return authenticationState.CommunicationError;
            }
            else{
                
                return authenticationState.CommunicationError;
            }
        }
    }
    return authenticationState.Authenticated;
}
module.exports.isAuthenticated = isAuthenticated;