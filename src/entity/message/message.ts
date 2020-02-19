import { MessageType } from "./message-type";

export class Message{
    type:MessageType=MessageType.notSet;
    text:String="";
}