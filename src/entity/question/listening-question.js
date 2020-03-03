import { Question } from "./question";


export class ListeningQuestion extends Question {

    constructor() {
        this.audioLink = "";
        /* QuestionItem Array */
        this.questionItems = new Array();
    }
}