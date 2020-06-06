import  Question  from "../question/question";

/* Is used for both slang and vocab */
export class VocabQuestion extends Question{

    constructor(){
        
        super();
        this.context = "";
        this.answerItems = [];
    }
}