export default class Response{

    isSuccessful:Boolean;
    clientValidations:String[];
    serverValidations:String[];
    outputJson:String|null;
    operationTimestamp:Date|null;

    constructor(){
        this.isSuccessful=false;
        this.clientValidations = [];
        this.serverValidations = [];
        this.outputJson = null;
        this.operationTimestamp = null;
    }

}