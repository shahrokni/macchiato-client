import IAppIntroducer from '../interface/IAppIntroducer';
import Contract from './contract';
import ContactInfo from './contact_info';
export default class Introducer implements IAppIntroducer {

    constructor() {
        this.code = '';
        this.name = '';
        this.isEnabled = true;
        this.contract = null;
        this.contactInfo = null;
    }
    code: string;
    name: string;
    isEnabled: boolean;
    contract: Contract | null;
    contactInfo: ContactInfo | null;
}