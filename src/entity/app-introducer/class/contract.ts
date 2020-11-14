import IContract from '../interface/IContract';
export default class Contract implements IContract{
    constructor() {
        this.percent = 0;
        this.beginDate = null;
        this.endDate = null;
        this.isEnabled = false;
    }
    percent: Number;
    beginDate: Date | null;
    endDate: Date | null;
    isEnabled: boolean;
}