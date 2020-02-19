import { Question } from "../question/question";
import { Answer } from "../answer/answer";

export class QuestionAnswer {

    order: Number = 0;
    question: Question = new Question();
    answer: Answer = new Answer();
}