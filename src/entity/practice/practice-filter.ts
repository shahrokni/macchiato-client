import { Skill } from "../mock-test/skill";
import { HardnessLevel } from "../question/hardness-level";

export class PracticeFilter{
    skill:Skill;
    hardnessLevel:HardnessLevel;
    lastQuestionNumber:Number;
}