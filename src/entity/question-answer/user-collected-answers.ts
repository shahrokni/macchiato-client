import { UserAnswer } from "./user-answer";
import User from "../user/user";
import { ActionType } from "./action-type";

//This class is used for both mock and level test
//The object of this class is sent to the server for correction process
export class UserCollectedAnswers{
    actionType:ActionType = ActionType.notSet;
    user:User=new User();    
    answeredItems:Array<UserAnswer> = new Array<UserAnswer>();    
}