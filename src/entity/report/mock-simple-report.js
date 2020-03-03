import { Report } from "./report";

export class MockSimpleReport extends Report {


    constructor() {
        
        this.listeningScore = 0;
        this.listeningCorrectAnswers = 0;
        this.listeningWrongAnswers = 0;

        this.ReadingScroe = 0;
        this.ReadingCorrectAnswers = 0;
        this.ReadingWrongAnswers = 0;

        this.WrtingScore = 0;
        this.SpeakingScore = 0;

        this.VocabScore = 0;
        this.VocabCorrectAnswers = 0;
        this.VocabWrongAnswers = 0;

        this.SlangScore = 0;
        this.SlangCorrectAnswers = 0;
        this.SlangWrongAnswers = 0;
    }
}