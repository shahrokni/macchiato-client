import { GlobalMessageType } from '../enum/global-message-type';
import GlobalMessageItem from './global-message-item';

export default class GlobalMessage {
    constructor() {
        this.type = GlobalMessageType.Information
        this.items = [];
        this.header = '';
        this.destination = '';
    }
    type: GlobalMessageType;
    items: GlobalMessageItem[];
    header: string;
    destination: string;
}