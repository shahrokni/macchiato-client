class Response {


    constructor() {
        this.isSuccessful = false;
        this.clientValidations = [];
        this.serverValidations = [];
        /*TODO:BUG */
        this.outputJson = "";
        this.operationTimestamp = new Date();
    }

    setClientValidations(clientErrorMessages) {

        if (clientErrorMessages == null || clientErrorMessages.length === 0)
            return;

        for (let i = 0; i < clientErrorMessages.length; i++) {
            this.clientValidations.push(clientErrorMessages[i]);
        }
    }
}

module.exports = Response;