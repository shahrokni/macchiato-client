import { PracticeType } from "../global/practice-type";

export default class Score {
    constructor() {
        this.score = 0;
        this.practiceType = PracticeType.NotSet;
    }
    score: number;
    practiceType: PracticeType;
}