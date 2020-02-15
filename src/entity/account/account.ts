import { User } from "../user/user";
import { PaymentItem } from "./paymet-item";

export class Account{
    user:User;
    currentBalance:Number;
    lastPaymentDay:Date;
    paymentHistory:Array<PaymentItem>;
}