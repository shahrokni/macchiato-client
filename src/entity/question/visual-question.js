import { Question } from "./question";
import { Answer } from "../answer/answer";

export class VisualQuestion extends Question{

    constructor(){

        this.context="";
        this.imageLink = "";      
        this.questionItems=[];
        this.answer=new Answer();
    }
}