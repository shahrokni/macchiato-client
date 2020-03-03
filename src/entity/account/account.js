import User from "../user/user";

export default class Account {

    constructor() {
        this.user = new User();
        this.currentBalance = 0;
        this.lastPaymentDay = new Date();
        /* Payment Items */
        this.paymentHistory = new Array();
    }
}