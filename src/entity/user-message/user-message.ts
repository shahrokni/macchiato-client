export default class UserMessage {

    constructor() {

        this.id = '';
        this.senderId = '';
        this.receiverId = '';
        this.sentDate = null;
        this.isRead = false;
        this.title = '';
        this.text = '';
    }
    id: string;
    senderId: string;
    receiverId: string;
    sentDate: Date | null;
    isRead: boolean;
    title: string;
    text: string;
}