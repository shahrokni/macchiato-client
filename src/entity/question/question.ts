import { HardnessLevel } from "./hardness-level";
import { QuestionType } from "./question-type";

export class Question{
    id:Number;
    title: String;
    hardnesLevel:HardnessLevel;
    creationDate:Date;    
    questionTpe:QuestionType;
}