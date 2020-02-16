import { UserAnswer } from "./user-answer";


//The object of this class is sent to the server for correction process
export class UserCollectedAnswers{    
    answeredItems:Array<UserAnswer>;    
}