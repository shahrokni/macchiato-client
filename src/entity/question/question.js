import { HardnessLevel } from "./hardness-level";
import { QuestionType } from "./question-type";

export class Question {

    constructor(){
        
        this.id = 0;
        this.title = "";
        this.hardnesLevel = HardnessLevel.NotSet;
        this.creationDate = undefined;
        this.questionType = QuestionType.NotSet;
        this.answerTime = 0;
        this.score2Asset = false;
        this.score = 0;
        this.usage = [];        
        this.genre = [];
        this.hashtag= [];
    }
}