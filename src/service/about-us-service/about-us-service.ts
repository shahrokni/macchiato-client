import AboutUs from '../../entity/about-us/class/about-us';
import Response from '../../communication/entity/response';
import RestProvider from '../../communication/entity/rest-provider';
import {Language} from '../../entity/global/language';
export default class AboutUsService{    
    constructor(){
        this.dateUtil = require('../../util/date-util/date-util');
    }
    dateUtil:any;

    async getAboutUs(language:Language):Promise<AboutUs|null>{

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();
        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());
        return new Promise((resolve,reject)=>{
            restInstance.get('/about_us/v1/aboutus?lang='+language).then((res:any)=>{

            }).catch((err:any)=>{

            });
            
        });
    }
}