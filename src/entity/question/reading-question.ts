import { QuestionItem } from "./question-item";
import { Question } from "./question";

export class ReadingQuestion extends Question{
    context:String;
    questionItems:Array<QuestionItem>
}