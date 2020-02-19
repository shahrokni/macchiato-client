import { Skill } from "../mock-test/skill";
import { HardnessLevel } from "../question/hardness-level";

export class PracticeFilter {
    skill: Skill = Skill.notSet;
    hardnessLevel: HardnessLevel = HardnessLevel.notSet;
    lastQuestionNumber: Number = 0;
}