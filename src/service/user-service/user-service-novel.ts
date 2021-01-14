import Response from '../../communication/entity/response';
import RestProvider from '../../communication/entity/rest-provider';
import { AuthenticationState } from '../../entity/global/authentication-state';
import { PracticeType } from '../../entity/global/practice-type';
import Score from '../../entity/score-box/score-box';

export default class UserService {

    dateUtil: any;
    constructor() {

        this.dateUtil = require('../../util/date-util/date-util');
    }

    isUserAuthenticated(): Promise<Boolean | null> {
        return new Promise((resolve, reject) => {

            let response = new Response();
            response.isSuccessful = false;
            response.operationTimestamp = this.dateUtil.getCurrentDateTime();
            let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

            restInstance.get('user_api/v1/user/isAuthenticated').then((res: any) => {

                var responseUtil: any = require('../../util/response-util/response-util');
                const serverResponse = responseUtil.extractResponse(res);
                const authState = responseUtil.isAuthenticated(serverResponse);

                if (authState === AuthenticationState.Authenticated)
                    resolve(true);
                else if (authState === AuthenticationState.NotAuthenticated)
                    resolve(false);
                else
                    resolve(null);
            })
                .catch((err: any) => {
                    resolve(null);
                })

        })
    }

    getScore(practiceType: PracticeType): Promise<Score> {
        return new Promise((resolve, reject) => {
            let response = new Response();
            response.isSuccessful = false;
            response.operationTimestamp = this.dateUtil.getCurrentDateTime();
            const restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());
            restInstance.get('user_api/v1/user/score?type=' + PracticeType[practiceType])
                .then((res: any) => {

                    var responseUtil: any = require('../../util/response-util/response-util');
                    const serverResponse = responseUtil.extractResponse(res);
                    if (serverResponse && serverResponse.isSuccessful && serverResponse.outputJson) {
                        resolve(serverResponse.outputJson as Score);
                    }
                    else {
                        //TODO
                        reject()
                    }
                })
                .catch((err: any) => {

                })
        });
    }

}