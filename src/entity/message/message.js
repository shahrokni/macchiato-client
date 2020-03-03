import { MessageType } from "./message-type";

export class Message{

    constructor(){
        this.type=MessageType.NotSet;
        this.text = "";
    }   
}