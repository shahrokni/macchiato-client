import { HardnessLevel } from "./hardness-level";
import { QuestionType } from "./question-type";

export class Question {

    constructor(){
        this.id = 0;
        this.title = "";
        this.hardnesLevel = HardnessLevel.NotSet;
        this.creationDate = new Date();
        this.questionTpe = QuestionType.NotSet;
        /* Word Array */
        this.hashtag= new Array();
    }
}