
import User from "../user/user";
import { ActionType } from "./action-type";

//This class is used for both mock and level test
//The object of this class is sent to the server for correction process
export class UserCollectedAnswers {

    constructor() {
        this.actionType = ActionType.NotSet;
        this.user = new User();
        /*UserAnswer Array*/
        this.answeredItems = new Array();
    }
}