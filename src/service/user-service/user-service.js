

import Response from '../../communication/entity/response';
import RestProvider from '../../communication/entity/rest-provider';
import ErrorMessages from '../../resource/text/error-message';

export default class UserService {


    constructor() {

        this.dateUtil = require('../../util/date-util/date-util');
    }

    /*user: User - output:Response*/
    getUser(userFilter, callBack) {

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();

        let UserValidationClass = require('../../util/validation/user-validation');
        let validator = new UserValidationClass();

        let errorMessages =[] //validator.validateFetchUser(userFilter);

        if (errorMessages != null && errorMessages.length !== 0) {

            response.setClientValidations(errorMessages);
            callBack(response);
        }
        else {

            let query;

            //Set the query accordingly
            if (userFilter.studentNumber)
                query = 'studentNumber=' + userFilter.studentNumber;
            else if(userFilter.id)
                query = 'id=' + userFilter.id;

            let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

            restInstance.get('user_api/v1/user?' + query).then(function (res) {

                let responseUtil = require('../../util/response-util/response-util');
                let serverResponse = responseUtil.extractResponse(res);
                callBack(serverResponse);

            })
                .catch(function (err) {

                    response.setClientValidations(errorMessages.push(ErrorMessages.Err0000()));
                    callBack(response);
                });
        }

    }

    getUserDetail(userFilter, callBack) {

        //TODO
    }

    /*userDetial: UserDetail - output: Response*/
    signUp(userDetail, callBack) {


        //Validattion
        let UserValidationClass = require('../../util/validation/user-validation');
        let validator = new UserValidationClass();

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();

        let errorMessages = validator.validateSignUpData(userDetail);

        if (errorMessages != null && errorMessages.length !== 0) {

            response.setClientValidations(errorMessages);
            callBack(response);
        }
        else {

            let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

            restInstance.post('user_api/v1/user', userDetail).then(function (res) {

                let responseUtil = require('../../util/response-util/response-util');
                let serverResponse = responseUtil.extractResponse(res);
                callBack(serverResponse);
            })
                .catch(function (err) {

                    response.setClientValidations(errorMessages.push(ErrorMessages.Err0000()));
                    callBack(response);
                });
        }

    }

    /*user: User - output: Response*/
    signIn(user, callBack) {

        //TODO      
    }

    /*userDetail: UserDetail-output: Reponse*/
    update(userDetail, callBack) {


        let UserValidationClass = require('../../util/validation/user-validation');
        let validator = new UserValidationClass();
        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();

        let errorMessages = validator.validateUpdateData(userDetail);

        if (errorMessages != null && errorMessages.length !== 0) {

            response.setClientValidations(errorMessages);
            callBack(response);
        }
        else {

            let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

            restInstance.put('user_api/v1/user', userDetail).then(function (res) {

                let responseUtil = require('../../util/response-util/response-util');
                let serverResponse = responseUtil.extractResponse(res);
                callBack(serverResponse);

            })
                .catch(function (err) {

                    response.setClientValidations(errorMessages.push(ErrorMessages.Err0000()));
                    callBack(response);
                });
        }
    }

    /*user: User - output: Response*/
    logOut(user, callBack) {

        //TODO        
    }
}