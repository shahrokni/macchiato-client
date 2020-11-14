import IContactInfo from "../interface/IContactInfo";
export default class ContactInfo implements IContactInfo {
    constructor() {
        this.tell = null;
        this.address = null;
        this.email = null;
    }
    tell: string | null;
    address: string | null;
    email: string | null;
}