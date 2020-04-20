
import { AnswerType } from './answer-type';

export class Answer {

    constructor() {
        
        this.answerType = AnswerType.NotSet;
        this.correctAnswer = '';
        this.multipleChoice = [];
    }
}