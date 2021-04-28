import AboutUs from '../../entity/about-us/class/about-us';
import Response from '../../communication/entity/response-novel';
import RestProvider from '../../communication/entity/rest-provider';
import { Language } from '../../entity/global/language';
import { AboutUsItemType } from '../../entity/about-us/enum/about-us-item-type';
import AboutUsTextItem from '../../entity/about-us/class/about-us-item-text';
import AboutUsImageItem from '../../entity/about-us/class/about-us-item-image';
import ErrorMessage from '../../resource/text/error-message';
export default class AboutUsService {
    constructor() {
        this.dateUtil = require('../../util/date-util/date-util');
    }
    dateUtil: any;

    getAboutUs(language: Language): Promise<Response<AboutUs>> {

        let response = new Response<AboutUs>();
        response.isSuccessful = false;
        response.operationTimeClient = this.dateUtil.getCurrentDateTime();
        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());
        return new Promise((resolve, reject) => {
            restInstance.get('/about_us/v1/aboutus?lang=' + Language[language])
                .then((res: any) => {
                    let responseUtil = require('../../util/response-util/response-util');
                    let serverResponse = responseUtil.extractResponse(res);
                    response.operationTimeServer = serverResponse.operationTimestamp;
                    if (serverResponse.isSuccessful) {
                        response.isSuccessful = true;
                        let aboutus = new AboutUs();
                        aboutus.AboutUsItems = [];
                        aboutus.language = serverResponse.outputJson.language;
                        for (let i = 0; i < serverResponse.outputJson.aboutUsItems.length; i++) {

                            if (serverResponse.outputJson.aboutUsItems[i].type == AboutUsItemType[AboutUsItemType.Text]) {
                                let textItem = new AboutUsTextItem();
                                textItem.header = serverResponse.outputJson.aboutUsItems[i].header;
                                textItem.text = serverResponse.outputJson.aboutUsItems[i].text;
                                textItem.order = serverResponse.outputJson.aboutUsItems[i].order;
                                textItem.type = serverResponse.outputJson.aboutUsItems[i].type;
                                aboutus.AboutUsItems.push(textItem);
                                continue;
                            }
                            else if (serverResponse.outputJson.aboutUsItems[i].type == AboutUsItemType[AboutUsItemType.Image]) {
                                console.log(serverResponse.outputJson.aboutUsItems[i]);
                                let imageItem = new AboutUsImageItem();
                                imageItem.order = serverResponse.outputJson.aboutUsItems[i].order;
                                imageItem.type = serverResponse.outputJson.aboutUsItems[i].type;
                                imageItem.image.name = serverResponse.outputJson.aboutUsItems[i].image.name;
                                imageItem.image.alt = serverResponse.outputJson.aboutUsItems[i].image.alt;
                                imageItem.image.type = serverResponse.outputJson.aboutUsItems[i].image.type;
                                imageItem.image.hasMobileTabletPortrait = serverResponse.outputJson.aboutUsItems[i].image.hasMobileTabletPortrait;
                                imageItem.image.hasMobileTabletLandscape = serverResponse.outputJson.aboutUsItems[i].image.hasMobileTabletLandscape;
                                imageItem.image.hasIPadFamily = serverResponse.outputJson.aboutUsItems[i].image.hasIPadFamily;
                                imageItem.image.hasDesktop = serverResponse.outputJson.aboutUsItems[i].image.hasDesktop;

                                aboutus.AboutUsItems.push(imageItem);
                            }
                        }
                        response.outputJson = aboutus;
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
                });

        });
    }
}