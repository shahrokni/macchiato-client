import { HardnessLevel } from "./hardness-level";
import { QuestionType } from "./question-type";

export default class Question {

    constructor(){
        
        this.id = 0;
        this.title = "";
        this.hardnes = HardnessLevel.NotSet;
        this.creationDate = undefined;
        this.type = QuestionType.NotSet;
        this.answerDuration = 0;
        this.score2Asset = false;
        this.score = 0;
        this.usage = [];        
        this.genre = [];
        this.hashtags= [];
    }
}