export default class Response {


    constructor() {
        this.isSuccessful = false;
        this.clientValidations = new Array();
        this.serverValidations = new Array();
        this.outputJson = "";
        this.operationTimestamp = new Date();
    }

    setClientValidations(clientErrorMessages){

        if(clientErrorMessages==null || clientErrorMessages.length === 0)
            return;
        
        for(let i=0;i<clientErrorMessages.length;i++){
            this.clientValidations.push(clientErrorMessages[i]);
        }
    }

    setServerValidations(serverErrorMessages){

        if(serverErrorMessages == null || serverErrorMessages.length === 0 )
            return;
        
        for(let i=0; i<serverErrorMessages.length;i++){
            this.serverValidations.push(serverErrorMessages[i]);
        }
    
    }
}