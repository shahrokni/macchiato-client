export default  class CommonGlobalMessages {

    /* COMMUNICATION ERROR */
    static getCommunicationErrorMessage(){
        let globalMessage = new GlobalMessageViewModel();
        globalMessage.text = ErrorMessage.Err0000()+' Please try again!';
        globalMessage.type = GlobalMessageType.Error;
        globalMessage.title = 'Something went wrong!'
        globalMessage.redirect.link = '/'+appGeneralInfo.views.sigin;
        globalMessage.redirect.text = 'Try again!'
        return globalMessage;
    }
}