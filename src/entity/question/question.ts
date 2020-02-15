import { HardnessLevel } from "./hardness-level";
import { QuestionType } from "./question-type";
import { Word } from "./word";

export class Question{
    id:Number;
    title: String;
    hardnesLevel:HardnessLevel;
    creationDate:Date;    
    questionTpe:QuestionType;
    hashtag:Array<Word>
}