import TermOfUse from '../../entity/term-of-use/class/term-of-use';
import Response from '../../communication/entity/response';
import RestProvider from '../../communication/entity/rest-provider';

export default class TermOfUseService {

    dateUtil;
    constructor() {
        this.dateUtil = require('../../util/date-util/date-util');
    }

    async getApplicationTerm(): Promise<TermOfUse | null> {

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();
        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

        return new Promise((resolve, reject) => {
            restInstance.get('termofuse_api/v1/termofuse')
                .then((res: any) => {
                    let responseUtil = require('../../util/response-util/response-util');
                    let serverResponse = responseUtil.extractResponse(res);
                    if (!serverResponse || !serverResponse.outputJson)
                        resolve(null);
                    resolve(serverResponse.outputJson as TermOfUse);
                });
        })
    }
}