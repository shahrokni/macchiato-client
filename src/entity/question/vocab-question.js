import { Question } from "./question";

/* Is used for both slang and vocab */
export class VocabQuestion extends Question{

    constructor(){
        
        this.blankContext = "";
        this.answerItems = [];
    }
}