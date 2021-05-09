import Introducer from '../../entity/app-introducer/class/introducer';
import Response from '../../communication/entity/response-novel';
import RestProvider from '../../communication/entity/rest-provider';
import ErrorMessage from '../../resource/text/error-message';

export default class IntroducerService {

    dateUtil: any;
    constructor() {
        this.dateUtil = require('../../util/date-util/date-util');
    }

    getAllIntroducers(): Promise<Response<Introducer[]>> {
        let response = new Response<Introducer[]>();
        response.isSuccessful = false;
        response.operationTimeClient = this.dateUtil.getCurrentDateTime();
        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

        return new Promise((resolve, reject) => {
            restInstance.get('/introducer_api/v1/introducers')
                .then((res: any) => {
                    let responseUtil = require('../../util/response-util/response-util');
                    let serverResponse = responseUtil.extractResponse(res);
                    response.operationTimeServer = serverResponse.operationTimestamp;
                    if (serverResponse.isSuccessful) {
                        response.isSuccessful = true;
                        response.outputJson = serverResponse.outputJson as Introducer[];
                        resolve(response)
                    }
                    else {
                        response.isSuccessful = false;
                        (serverResponse.serverValidations as string[]).forEach((serverErr) => {
                            response.serverValidations.push(serverErr);
                        });
                        resolve(response)
                    }
                }).catch(() => {
                    response.isSuccessful = false;
                    response.clientValidations.push(ErrorMessage.Err0000().toString());
                    resolve(response);
                })
        })
    }

    getAllIntroducersDetail(): Promise<Response<Introducer[]>> {

        let response = new Response<Introducer[]>();
        response.isSuccessful = false;
        response.operationTimeClient = this.dateUtil.getCurrentDateTime();
        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

        return new Promise((resolve, reject) => {
            restInstance.get('introducer_api/v1/introducers/detail')
                .then((res: any) => {
                    let responseUtil = require('../../util/response-util/response-util');
                    let serverResponse = responseUtil.extractResponse(res);
                    response.operationTimeServer = serverResponse.operationTimestamp;
                    if (serverResponse.isSuccessful) {
                        response.isSuccessful = true;
                        response.outputJson = serverResponse.outputJson as Introducer[];
                        resolve(response);
                    }
                    else {
                        response.isSuccessful = false;
                        (serverResponse.serverValidations as string[]).forEach((serverErr) => {
                            response.serverValidations.push(serverErr);
                        });
                        resolve(response);
                    }

                }).catch(() => {
                    response.isSuccessful = false;
                    response.clientValidations.push(ErrorMessage.Err0000().toString());
                    resolve(response);
                })
        });
    }


    addIntroducer(introducer: Introducer): Promise<Response<Introducer>> {
        let response = new Response<Introducer>();
        response.isSuccessful = false;
        response.operationTimeClient = this.dateUtil.getCurrentDateTime();
        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());
        return new Promise((resolve, reject) => {
            restInstance.post('admin_introducer_api/v1/introducer', introducer)
                .then((res: any) => {
                    let responseUtil = require('../../util/response-util/response-util');
                    let serverResponse = responseUtil.extractResponse(res);
                    response.operationTimeServer = serverResponse.operationTimestamp;
                    if (serverResponse.isSuccessful) {
                        response.isSuccessful = true;
                        response.outputJson = serverResponse.outputJson as Introducer;
                        resolve(response);
                    }
                    else {
                        response.isSuccessful = false;
                        (serverResponse.serverValidations as string[]).forEach((serverErr) => {
                            response.serverValidations.push(serverErr);
                        });
                        resolve(response)
                    }

                }).catch(() => {
                    response.isSuccessful = false;
                    response.clientValidations.push(ErrorMessage.Err0000().toString());
                    resolve(response);
                })
        });
    }
}