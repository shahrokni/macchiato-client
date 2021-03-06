import Response from '../../communication/entity/response';
import RestProvider from '../../communication/entity/rest-provider';
import ErrorMessages from '../../resource/text/error-message';


export default class UserService {


    constructor() {

        this.dateUtil = require('../../util/date-util/date-util');
    }

    isUserAuthenticated(callBack) {

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();

        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

        restInstance.get('user_api/v1/user/isAuthenticated').then((res) => {

            let responseUtil = require('../../util/response-util/response-util');
            let serverResponse = responseUtil.extractResponse(res);
            callBack(serverResponse);
        })
            .catch((err) => {

                response.clientValidations.push(ErrorMessages.Err0000());
                callBack(response);
            })

    }

    getUserDetail(callBack) {

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();


        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

        restInstance.get('user_api/v1/userDetail').then(function (res) {

            let responseUtil = require('../../util/response-util/response-util');
            let serverResponse = responseUtil.extractResponse(res);
            callBack(serverResponse);

        })
            .catch(function (err) {

                response.clientValidations.push(ErrorMessages.Err0000());
                callBack(response);
            });

    }

    /*userDetial: UserDetail - output: Response*/
    signUp(userDetail, callBack) {

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
            restInstance.post('user_api/v1/user', userDetail)
            .then(function (res) {            
                let responseUtil = require('../../util/response-util/response-util');
                let serverResponse = responseUtil.extractResponse(res);
                callBack(serverResponse);
            })
                .catch(function (err) {                  
                    errorMessages.push(ErrorMessages.Err0000());
                    response.setClientValidations(errorMessages);
                    callBack(response);
                });
        }

    }
    
    /*authKey:string */
    signinWithAuthKey(authKey,callBack){

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();

        if(!authKey){

            response.clientValidations.push(ErrorMessages.Err0000());
            callBack(response);
        }
        else{

            const restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());
            const api = 'user_api/v1/user/loginwithauthkey';
            restInstance.post(api,{authKey:authKey})
            .then((response)=>{

                const responseUtil = require('../../util/response-util/response-util');
                const serverResponse = responseUtil.extractResponse(response);
                callBack(serverResponse);
            })
            .catch((err)=>{

                response.clientValidations.push(ErrorMessages.Err0000());
                callBack(response);
            });
        }
    }
    /*user: User - output: Response*/
    signIn(user, callBack) {

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();

        if (!user.userName || !user.password) {

            response.clientValidations.push(ErrorMessages.ErrBu0015());
            callBack(response);
        }
        else {

            let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());
            let api = '';
            (user.rememberMe === false) ? api = 'user_api/v1/user/login' : api = 'user_api/v1/user/login_set_remember';

            restInstance.post(api, { username: user.userName, password: user.password })
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
    }

    /*deprecated*/
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

                    response.clientValidations.push(ErrorMessages.Err0000());
                    callBack(response);
                });
        }
    }

    changePassword(oldPassword, newPassword, repeatedNewPassword, callBack) {

        let UserValidationClass = require('../../util/validation/user-validation');
        let validator = new UserValidationClass();

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();

        let errorMessages = validator.validateChangePassword(oldPassword, newPassword, repeatedNewPassword);

        if (errorMessages != null && errorMessages.length !== 0) {

            response.setClientValidations(errorMessages);
            callBack(response);
        }
        else {

            let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

            restInstance.put('user_api/v1/user/password', {

                'oldPassword': oldPassword,
                'newPassword': newPassword,
                'repeatedNewPassword': repeatedNewPassword

            }).then(function (res) {

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
}