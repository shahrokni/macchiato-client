import GlobalMessageViewModel from '../../component/global-message-view/view-model/global-message-view-model';
import { GlobalMessageType } from '../../component/global-message-view/view-model/global-message-type';
import ErrorMessage from './error-message';
import { appGeneralInfo } from '../../setup-general-information';
export default class CommonGlobalMessages {

    /* COMMUNICATION ERROR */
    static getCommunicationErrorMessage() {
        let globalMessage = new GlobalMessageViewModel();
        globalMessage.text = ErrorMessage.Err0000() + ' Please try again!';
        globalMessage.type = GlobalMessageType.Error;
        globalMessage.title = 'Something went wrong!'
        globalMessage.redirect.link = '/' + appGeneralInfo.views.sigin;
        globalMessage.redirect.text = 'Try again!'
        return globalMessage;
    }
}