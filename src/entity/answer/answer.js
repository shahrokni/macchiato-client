
import { AnswerType } from './answer-type';

export default class Answer {

    constructor() {
        
        this.answerType = AnswerType.NotSet;
        this.correctAnswer = '';
        this.multipleChoice = [];
    }
}