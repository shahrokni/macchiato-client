export default class PaymentItem {

    constructor() {

        this.transactionDate = new Date();
        this.amount = 0;
        this.description = '';
        this.isGift = false;
    }
}