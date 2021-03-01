export default class UserMessage {

    _id: string | undefined;
    senderId: string | undefined;
    receiverId: string | undefined;
    sentDate: Date | string |undefined;
    isRead: boolean | undefined;
    title: string | undefined;
    text: string | undefined;
    isAdvertisement: boolean | undefined;
}