import { QuestionItem } from "./question-item";
import { Question } from "./question";

export class ReadingQuestion extends Question{
    context:String;
    imageLink:String;
    questionItems:Array<QuestionItem>
}