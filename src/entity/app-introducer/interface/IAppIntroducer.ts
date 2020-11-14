import Contract from '../class/contract';
import ContactInfo from '../class/contact_info';
export default interface IAppIntroducer {
    code: string;
    name: string;
    isEnabled: boolean;
    contract: Contract[] | null;
    contactInfo: ContactInfo | null;
}