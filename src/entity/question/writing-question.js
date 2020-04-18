import { SWQuestion } from "./sw-question";
import { LongTextAnswer } from "../answer/long-text-answer";

export class WritingQuestion extends SWQuestion{

    constructor(){

        this.answer = new LongTextAnswer();
    }
}