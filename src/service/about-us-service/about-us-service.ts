import AboutUs from '../../entity/about-us/class/about-us';
import Response from '../../communication/entity/response';
import RestProvider from '../../communication/entity/rest-provider';
import { Language } from '../../entity/global/language';
import { AboutUsItemType } from '../../entity/about-us/enum/about-us-item-type';
import AboutUsTextItem from '../../entity/about-us/class/about-us-item-text';
import AboutUsImageItem from '../../entity/about-us/class/about-us-item-image';
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
                        response.AboutUsItems = [];
                        response.language = serverResponse.outputJson.language;
                        for (let i = 0; i < serverResponse.outputJson.aboutUsItems.length; i++) {

                            if (serverResponse.outputJson.aboutUsItems[i].type == AboutUsItemType[AboutUsItemType.Text]) {
                                let textItem = new AboutUsTextItem();
                                textItem.header = serverResponse.outputJson.aboutUsItems[i].header;
                                textItem.text = serverResponse.outputJson.aboutUsItems[i].text;
                                textItem.order = serverResponse.outputJson.aboutUsItems[i].order;
                                textItem.type = serverResponse.outputJson.aboutUsItems[i].type;
                                response.AboutUsItems.push(textItem);
                                continue;
                            }
                            else if (serverResponse.outputJson.aboutUsItems[i].type == AboutUsItemType[AboutUsItemType.Image]) {
                                let imageItem = new AboutUsImageItem();
                                imageItem.order = serverResponse.outputJson.aboutUsItems[i].order;
                                imageItem.type = serverResponse.outputJson.aboutUsItems[i].type;
                                imageItem.url = serverResponse.outputJson.aboutUsItems[i].url;
                                response.AboutUsItems.push(imageItem);
                            }
                        }
                        resolve(response);
                    }
                }).catch((err: any) => {

                });

        });
    }
}