import  User  from "../user/user";
import { PaymentItem } from "./paymet-item";

export class Account {
    user: User = new User();
    currentBalance: Number = 0;
    lastPaymentDay: Date = new Date();
    paymentHistory: Array<PaymentItem> = new Array<PaymentItem>();
}