import Introducer from '../../entity/app-introducer/class/introducer';
import Response from '../../communication/entity/response';
import RestProvider from '../../communication/entity/rest-provider';

export default class IntroducerService {

    dateUtil: any;
    constructor() {
        this.dateUtil = require('../../util/date-util/date-util');
    }

    async getAllIntroducers(): Promise<Introducer[] | null> {        
        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();
        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

        return new Promise((resolve, reject) => {
            restInstance.get('introducer_api/v1/introducers')
                .then((res: any) => {                   
                    let responseUtil = require('../../util/response-util/response-util');
                    let serverResponse = responseUtil.extractResponse(res);
                    if (!serverResponse || !serverResponse.outputJson)
                        resolve(null);
                    resolve(serverResponse.outputJson as Introducer[]);
                });
        })
    }

    async getAllIntroducersDetail(): Promise<Introducer[] | null> {

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();
        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

        return new Promise((resolve, reject) => {
            restInstance.get('introducer_api/v1/introducers/detail')
                .then((res: any) => {
                    let responseUtil = require('../../util/response-util/response-util');
                    let serverResponse = responseUtil.extractResponse(res);
                    if (!serverResponse || !serverResponse.outputJson)
                        resolve(null);
                    resolve(serverResponse.outputJson as Introducer[]);
                });
        });
    }


    async addIntroducer(introducer: Introducer): Promise<Introducer | null> {
        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();
        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

        return new Promise((resolve, reject) => {
            restInstance.post('admin_introducer_api/v1/introducer', introducer)
                .then((res: any) => {
                    let responseUtil = require('../../util/response-util/response-util');
                    let serverResponse = responseUtil.extractResponse(res);
                    if (!serverResponse || !serverResponse.outputJson)
                        resolve(null);
                    resolve(serverResponse.outputJson as Introducer);
                });
        });
    }
}