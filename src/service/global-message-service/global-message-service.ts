import GlobalMessage from "../../entity/global-message/class/global-message";

export default class GlobalMessageService{

    dateUtil: any;
    constructor() {
        this.dateUtil = require('../../util/date-util/date-util');
    }

    getMessageByTransactionCode():Promise<GlobalMessage|null>{
        return new Promise(()=>{});
    }
}