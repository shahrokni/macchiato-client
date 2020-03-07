class Response {


    constructor() {
        this.isSuccessful = false;
        this.clientValidations = [];
        this.serverValidations = [];
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

module.exports = Response;