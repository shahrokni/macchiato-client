import Response from '../../communication/entity/response-novel';
import UserMessage from '../../entity/user-message/user-message';
import RestProvider from '../../communication/entity/rest-provider';

export default class TestService { 
    dateUtil: any;
    constructor() {
        this.dateUtil = require('../../util/date-util/date-util');
    }

    sendMessage(message:UserMessage):Promise<Response<UserMessage>>{
        return new Promise((resolve)=>{
            const response = new Response<UserMessage>();
            response.isSuccessful = false;
            response.operationTimeClient = this.dateUtil.getCurrentDateTime();
            const restInstance = RestProvider
            .createInstance(RestProvider.getTimeoutDuration());
            restInstance.post('/admin_usermessage_api/v1/message',message)
            .then((res:Response<UserMessage>)=>{
                console.log('result',res)
            })
            .catch((err)=>{
                console.log('err',err);
            })

        })
    }
}