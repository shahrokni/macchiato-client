import { Skill } from "../mock-test/skill";
import { HardnessLevel } from "../question/hardness-level";

export class PracticeFilter {

    constructor() {
        this.skill = Skill.NotSet;
        this.hardnessLevel = HardnessLevel.NotSet;
        this.lastQuestionNumber = 0;
    }
}