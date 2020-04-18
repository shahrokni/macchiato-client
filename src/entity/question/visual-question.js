import { SWAnswer } from "../answer/sw-answer";
import { SWQuestion } from "./sw-question";

export class VisualQuestion extends SWQuestion{

    constructor(){
        
        this.imageLink = '';      
        this.answer=new SWAnswer();
    }
}