export default class Response<T>{

    isSuccessful:Boolean;
    clientValidations:String[];
    serverValidations:String[];
    outputJson: T | undefined;
    operationTimeClient:Date|null;
    operationTimeServer:Date|null;
    constructor(){
        this.isSuccessful=false;
        this.clientValidations = [];
        this.serverValidations = [];       
        this.operationTimeClient = null;
        this.operationTimeServer = null;
    }

}