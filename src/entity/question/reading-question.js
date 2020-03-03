import { Question } from "./question";

export class ReadingQuestion extends Question{

    constructor(){

        this.context="";
        this.imageLink="";
        /*QuestionItem Array*/
        this.questionItems=new Array();
    }   
  
}