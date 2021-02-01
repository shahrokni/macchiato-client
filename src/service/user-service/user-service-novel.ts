import Response from '../../communication/entity/response-novel';
import RestProvider from '../../communication/entity/rest-provider';
import { AuthenticationState } from '../../entity/global/authentication-state-novel';
import Score from '../../entity/score-box/score-box';
import { UserDetail } from '../../entity/user/userDetail';
import ErrorMessage from '../../resource/text/error-message';


export default class UserService {

    dateUtil: any;
    constructor() {
        this.dateUtil = require('../../util/date-util/date-util');
    }

    isUserAuthenticated(): Promise<Response<AuthenticationState>> {
        return new Promise((resolve) => {

            let response = new Response<AuthenticationState>();
            response.isSuccessful = false;
            response.operationTimeClient = this.dateUtil.getCurrentDateTime();
            let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

            restInstance.get('user_api/v1/user/isAuthenticated').then((res: any) => {

                var responseUtil: any = require('../../util/response-util/response-util');
                const serverResponse = responseUtil.extractResponse(res);
                const authState = responseUtil.isAuthenticated(serverResponse);
                response.operationTimeServer = serverResponse.operationTimestamp;
                response.isSuccessful = true;

                if (authState === 'Authenticated') {
                    response.outputJson = AuthenticationState.Authenticated;
                }
                else if (authState === 'Not Aauthenticated') {
                    response.outputJson = AuthenticationState.NotAuthenticated;
                }
                else if (authState === 'Communication Error') {
                    response.outputJson = AuthenticationState.CommunicationError;
                }
                else {
                    response.outputJson = AuthenticationState.NotSet;
                }
                resolve(response);

            })
                .catch(() => {
                    response.isSuccessful = false;
                    response.serverValidations.push(ErrorMessage.Err0000().toString());
                    resolve(response);
                })

        })
    }

    getScore(): Promise<Response<Score>> {
        return new Promise((resolve, reject) => {
            let response = new Response<Score>();
            response.isSuccessful = false;
            response.operationTimeClient = this.dateUtil.getCurrentDateTime();
            const restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());
            restInstance.get('user_api/v1/user/score')
                .then((res: any) => {

                    var responseUtil: any = require('../../util/response-util/response-util');
                    const serverResponse = responseUtil.extractResponse(res);
                    response.operationTimeServer = serverResponse.operationTimestamp;
                    if (serverResponse.isSuccessful) {
                        response.isSuccessful = true;
                        response.outputJson = serverResponse.outputJson as Score;
                        resolve(response);
                    }
                    else {
                        (serverResponse.serverValidations as string[]).forEach((serverError) => {
                            response.serverValidations.push(serverError);
                        });
                    }
                })
                .catch((err: any) => {
                    response.isSuccessful = false;
                    response.serverValidations.push(ErrorMessage.Err0000().toString());
                    resolve(response);
                })
        });
    }

    getEmail(): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            let response = new Response<string>();
            response.isSuccessful = false;
            response.operationTimeClient = this.dateUtil.getCurrentDateTime();
            let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());
            restInstance.get('user_api/v1/user/email').then((res: any) => {
                var responseUtil: any = require('../../util/response-util/response-util');
                const serverResponse = responseUtil.extractResponse(res);
                response.operationTimeServer = serverResponse.operationTimestamp;
                if (serverResponse.isSuccessful) {
                    response.isSuccessful = true;
                    response.outputJson = serverResponse.outputJson as string;
                    resolve(response);
                }
                else {
                    (serverResponse.serverValidations as string[]).forEach((serverError) => {
                        response.serverValidations.push(serverError);
                    });
                }
            })
                .catch((err: any) => {
                    response.isSuccessful = false;
                    response.serverValidations.push(ErrorMessage.Err0000().toString());
                    resolve(response);
                })
        });
    }



    updateEmail(newEmail: string): Promise<Response<UserDetail>> {

        return new Promise((resolve, reject) => {

            let UserValidationClass = require('../../util/validation/user-validation');
            let validator = new UserValidationClass();
            let response = new Response<UserDetail>();
            response.isSuccessful = false;
            response.operationTimeClient = this.dateUtil.getCurrentDateTime();
            let errorMessages = validator.validateUpdateEmail(newEmail);
            if (errorMessages != null && errorMessages.length !== 0) {
                (errorMessages as string[]).forEach((clientError) => {
                    response.clientValidations.push(clientError);
                });
                resolve(response);
            }
            else {
                let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());
                restInstance.put('user_api/v1/user/email', { 'newEmail': newEmail }).then((res: any) => {

                    let responseUtil = require('../../util/response-util/response-util');
                    let serverResponse = responseUtil.extractResponse(res);
                    response.operationTimeServer = serverResponse.operationTimestamp;
                    if (serverResponse.isSuccessful) {
                        response.isSuccessful = true;
                        response.outputJson = serverResponse.outputJson as UserDetail
                        resolve(response);
                    }
                    else {
                        response.isSuccessful = false;
                        (serverResponse.serverValidations as string[]).forEach((serverError) => {
                            response.serverValidations.push(serverError);
                        });
                        resolve(response);
                    }

                }).catch(() => {
                    response.isSuccessful = false;
                    response.clientValidations.push(ErrorMessage.Err0000().toString());
                    resolve(response)
                })
            }
        });
    }

    getCellphone(): Promise<Response<string>> {
        return new Promise((resolve) => {
            const response = new Response<string>();
            response.isSuccessful = false;
            response.operationTimeClient = this.dateUtil.getCurrentDateTime();
            const restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());
            restInstance.get('user_api/v1/user/cellphone').then((res: any) => {
                let responseUtil = require('../../util/response-util/response-util');
                let serverResponse = responseUtil.extractResponse(res);
                if (serverResponse.isSuccessful) {
                    response.isSuccessful = true;
                    response.outputJson = serverResponse.outputJson as string;
                    resolve(response);
                }
                else {
                    response.isSuccessful = false;
                    (serverResponse.serverValidations as string[]).forEach((serverError) => {
                        response.serverValidations.push(serverError);
                    });
                    resolve(response);
                }
            })
                .catch(() => {
                    response.isSuccessful = false;
                    response.clientValidations.push(ErrorMessage.Err0000().toString());
                    resolve(response);
                })
        });
    }

    updateCellphone(newCellphone: string): Promise<Response<UserDetail>> {
        return new Promise((resolve) => {
            const response = new Response<UserDetail>();
            response.isSuccessful = false;
            response.operationTimeClient = this.dateUtil.getCurrentDateTime();
            const restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());
            restInstance.put('user_api/v1/user/cellphone', { "cellphone": newCellphone }).then((res: any) => {
                let responseUtil = require('../../util/response-util/response-util');
                let serverResponse = responseUtil.extractResponse(res);
                if (serverResponse.isSuccessful) {
                    response.isSuccessful = true;
                    response.outputJson = serverResponse.outputJson as UserDetail;
                    resolve(response);
                }
                else {
                    response.isSuccessful = false;
                    (serverResponse.serverValidations as string[]).forEach((serverError) => {
                        response.serverValidations.push(serverError);
                    });
                    resolve(response);
                }
            })
                .catch(() => {
                    response.isSuccessful = false;
                    response.clientValidations.push(ErrorMessage.Err0000().toString());
                    resolve(response);
                })
        });
    }

}