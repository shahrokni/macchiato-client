import AboutUs from '../../entity/about-us/class/about-us';
import Response from '../../communication/entity/response';
import RestProvider from '../../communication/entity/rest-provider';
import { Language } from '../../entity/global/language';
export default class AboutUsService {
    constructor() {
        this.dateUtil = require('../../util/date-util/date-util');
    }
    dateUtil: any;

    getAboutUs(language: Language): Promise<AboutUs | null> {

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();
        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());
        return new Promise((resolve, reject) => {
            restInstance.get('/about_us/v1/aboutus?lang=' + Language[language])
                .then((res: any) => {
                    let responseUtil = require('../../util/response-util/response-util');
                    let serverResponse = responseUtil.extractResponse(res);

                    if (!serverResponse || !serverResponse.outputJson)
                        resolve(null);
                    else {                        
                        let response = new AboutUs();
                        response.language = Language.Persian;
                        resolve(response);
                    }
                }).catch((err: any) => {

                });

        });
    }
}