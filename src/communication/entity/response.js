export default class Response {


    constructor() {
        this.isSuccessful = false;
        this.clientValidations = new Array();
        this.serverValidations = new Array();
        this.outputJson = "";
        this.operationTimestamp = new Date();
    }
}