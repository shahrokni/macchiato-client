import { HardnessLevel } from "./hardness-level";
import { QuestionType } from "./question-type";
import { Word } from "./word";

export class Question {
    id: Number = 0;
    title: String = "";
    hardnesLevel: HardnessLevel = HardnessLevel.notSet;
    creationDate: Date = new Date();
    questionTpe: QuestionType = QuestionType.notSet;
    hashtag: Array<Word> = new Array<Word>();
}