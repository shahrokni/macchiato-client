import { Question } from "./question";
import { QuestionItem } from "./question-item";

export class ListeningQuestion extends Question{

    audioLink: String="";
    questionItems:Array<QuestionItem>=new Array<QuestionItem>();
}