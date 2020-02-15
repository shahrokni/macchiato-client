import { AnswerType } from "../answer/answer-type";

//The object of this class is sent to the server for correction process
export class UserCollectedAnswer{
    answerType:AnswerType;
    answerItems:Array<String>;
    //TODO : Byte Aray for user voice
}