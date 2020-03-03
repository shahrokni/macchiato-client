import { YesNo } from "../global/YesNo";

export class PracticeItemResult {

    constructor() {
        this.wasCorrect = YesNo.NotSet;
        this.score = 0;
    }

}