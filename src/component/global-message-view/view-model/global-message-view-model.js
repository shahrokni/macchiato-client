import {GlobalMessageType} from './global-message-type';

export default class GlobalMessageViewModel{
    
    constructor(){
        this.type = GlobalMessageType.NotSet;
        this.text = '';
        this.title = '';
        this.redirect = {link:'',text:''};
    }
}