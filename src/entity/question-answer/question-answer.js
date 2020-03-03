import { Question } from "../question/question";
import { Answer } from "../answer/answer";

export class QuestionAnswer {

    constructor() {
        this.order = 0;
        this.question = new Question();
        this.answer = new Answer();
    }
}