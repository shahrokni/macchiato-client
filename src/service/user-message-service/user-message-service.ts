import Response from '../../communication/entity/response-novel';
import RestProvider from '../../communication/entity/rest-provider';
import IListDataServiceFilter from '../../entity/general-grid/I-list-data-service-filter';
import IListDataService from '../../entity/general-grid/IListDataService';
import rowMetaData from '../../entity/general-grid/row-meta-data';
import UserMessage from '../../entity/user-message/user-message';
import ErrorMessage from '../../resource/text/error-message';
import { appGeneralInfo } from '../../setup-general-information';
import { iso2ShortDate } from '../../util/date-util/date-util2';

export default class UserMessageService implements IListDataService {

    dateUtil: any;
    constructor() {
        this.dateUtil = require('../../util/date-util/date-util');
    }  

    listData(filter: IListDataServiceFilter | undefined | null):
        Promise<Response<rowMetaData[]>> {
        return new Promise((resolve) => {
            const response = new Response<rowMetaData[]>();
            response.isSuccessful = false;
            response.operationTimeClient = this.dateUtil.getCurrentDateTime();
            const restInstance = RestProvider
                .createInstance(RestProvider.getTimeoutDuration());
            restInstance.get('/user_message_api/v1/message/listdata',
                { params: filter }).then((res: any) => {
                    let responseUtil = require('../../util/response-util/response-util');
                    let serverResponse =
                        responseUtil.extractResponse(res) as Response<UserMessage[]>;
                    response.operationTimeServer = serverResponse.operationTimeServer;
                    if (serverResponse.isSuccessful) {
                        response.isSuccessful = true;
                        response.outputJson = [];
                        serverResponse.outputJson?.forEach((item) => {
                            const data = new rowMetaData;
                            data.annotations = [];
                            data.rowData = {
                                id: item._id,
                                isAdvertisement: item.isAdvertisement,
                                isRead: item.isRead,
                                sentDate: iso2ShortDate(item.sentDate as Date),
                                title: item.title
                            };
                            data.hasUpdate = false;                            
                            data.hasView = true;
                            data.viewUrl = appGeneralInfo.views.messageview + '/'+item._id;
                            data.hasDelete = (!item.isAdvertisement) ? true : false;
                            data.deletionUrl = (!item.isAdvertisement)?
                             appGeneralInfo.views.messagedelete + '/'+ item._id as string
                             : '';
                            (item.isRead)
                                ? data.annotations.push('readMessage')
                                : data.annotations.push('unreadMessage');
                            response.outputJson?.push(data);
                        });
                        resolve(response);
                    }
                    else {
                        response.isSuccessful = false;
                        (serverResponse.serverValidations as string[])
                            .forEach((serverError) => {
                                response.serverValidations.push(serverError);
                            });
                        resolve(response);
                    }
                }).catch((err: any) => {
                    console.log(err);
                    response.isSuccessful = false;
                    response.clientValidations.push(ErrorMessage.Err0000().toString());
                    resolve(response);
                });
        });
    }

    countListData(filter: IListDataServiceFilter | undefined | null):
        Promise<Response<number>> {
        return new Promise((resolve) => {
            const response = new Response<number>();
            response.isSuccessful = false;
            response.operationTimeClient = this.dateUtil.getCurrentDateTime();
            const restInstance = RestProvider
                .createInstance(RestProvider.getTimeoutDuration());
            restInstance.get('/user_message_api/v1/message/countall').then((res: any) => {
                let responseUtil = require('../../util/response-util/response-util');
                let serverResponse = responseUtil
                    .extractResponse(res) as Response<number>;
                response.operationTimeServer = serverResponse.operationTimeServer;
                if (serverResponse.isSuccessful) {
                    response.isSuccessful = true;
                    response.outputJson = serverResponse.outputJson;
                    resolve(response);
                }
                else {
                    response.isSuccessful = false;
                    (serverResponse.serverValidations as string[])
                        .forEach((serverError) => {
                            response.serverValidations.push(serverError);
                        });
                    resolve(response);
                }
            })
                .catch(((err:any) => {
                    console.log(err);
                    response.isSuccessful = false;
                    response.clientValidations.push(ErrorMessage.Err0000().toString());
                    resolve(response);
                }))
        });
    }

    getMessage(messageId: string): Promise<Response<UserMessage>> {
        return new Promise((resolve) => {
            const response = new Response<UserMessage>();
            response.isSuccessful = false;
            response.operationTimeClient = this.dateUtil.getCurrentDateTime();
            const restInstance = RestProvider
                .createInstance(RestProvider.getTimeoutDuration());
            restInstance.get(`/user_message_api/v1/message`,
            {params:{messageId:`${messageId}`}})
                .then((res: any) => {
                    let responseUtil = require('../../util/response-util/response-util');
                    let serverResponse = responseUtil
                        .extractResponse(res) as Response<UserMessage>;
                    response.operationTimeServer = serverResponse.operationTimeServer;
                    if (serverResponse.isSuccessful) {                      
                        response.isSuccessful = true;
                        response.outputJson = serverResponse.outputJson;
                        resolve(response);
                    }
                    else {
                        response.isSuccessful = false;
                        (serverResponse.serverValidations as string[])
                            .forEach((serverError) => {
                                response.serverValidations.push(serverError);
                            });
                        resolve(response);
                    }
                }).catch((err:any) => {
                    console.log(err);
                    response.isSuccessful = false;
                    response.clientValidations.push(ErrorMessage.Err0000().toString());
                    resolve(response);
                })
        });
    }

    deleteMessage(messageId: string): Promise<Response<void>> {
        return new Promise((resolve) => {
            const response = new Response<void>();
            response.isSuccessful = false;
            response.operationTimeClient = this.dateUtil.getCurrentDateTime();
            const restInstance = RestProvider
                .createInstance(RestProvider.getTimeoutDuration());
            restInstance.delete('/user_message_api/v1/message',
                { params: { messageId: messageId } }).then((res: any) => {
                    let responseUtil = require('../../util/response-util/response-util');
                    let serverResponse = responseUtil
                        .extractResponse(res) as Response<void>;
                    response.operationTimeServer = serverResponse.operationTimeServer;
                    if (serverResponse.isSuccessful) {
                        response.isSuccessful = true;
                        resolve(response)
                    }
                    else {
                        response.isSuccessful = false;
                        (serverResponse.serverValidations as string[])
                            .forEach((serverError) => {
                                response.serverValidations.push(serverError);
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

    setReadFlag(messageId: string): Promise<Response<void>> {
        return new Promise((resolve) => {
            const response = new Response<void>();
            response.isSuccessful = false;
            response.operationTimeClient = this.dateUtil.getCurrentDateTime();
            const restInstance = RestProvider
                .createInstance(RestProvider.getTimeoutDuration());
            restInstance.put('/user_message_api/v1/message/readFlag',
                { messageId: messageId })
                .then((res: any) => {
                    let responseUtil = require('../../util/response-util/response-util');
                    let serverResponse =
                        responseUtil.extractResponse(res) as Response<void>;
                    response.operationTimeServer = serverResponse.operationTimeServer;
                    if (serverResponse.isSuccessful) {
                        response.isSuccessful = true;
                        resolve(response)
                    }
                    else {
                        response.isSuccessful = false;
                        (serverResponse.serverValidations as string[])
                            .forEach((serverError) => {
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

    countUnreadMessages(): Promise<Response<number>> {
        return new Promise((resolve) => {
            const response = new Response<number>();
            response.isSuccessful = false;
            response.operationTimeClient = this.dateUtil.getCurrentDateTime();
            const restInstance = RestProvider
                .createInstance(RestProvider.getTimeoutDuration());
            restInstance.get('/user_message_api/v1/message/countunread')
                .then((res: any) => {
                    let responseUtil = require('../../util/response-util/response-util');
                    let serverResponse = responseUtil
                        .extractResponse(res) as Response<number>;
                    response.operationTimeServer = serverResponse.operationTimeServer;
                    if (serverResponse.isSuccessful) {
                        response.isSuccessful = true;
                        response.outputJson = serverResponse.outputJson;
                        resolve(response)
                    }
                    else {
                        response.isSuccessful = false;
                        (serverResponse.serverValidations as string[])
                            .forEach((serverError) => {
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

    static subscribe2NewMessageCount(callBack:(newMessageCount:number)=>void){

    }
}