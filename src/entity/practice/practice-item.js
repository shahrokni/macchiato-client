import { Question } from "../question/question";
import { Answer } from "../answer/answer";

export class PracticeItem {

    constructor() {
        this.question = new Question();
        this.answer = new Answer();
    }
}