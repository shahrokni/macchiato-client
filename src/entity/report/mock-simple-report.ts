import { Report } from "./report";

export class MockSimpleReport extends Report {

    listeningScore: Number = 0;
    listeningCorrectAnswers: Number = 0;
    listeningWrongAnswers: Number = 0;

    ReadingScroe: Number = 0;
    ReadingCorrectAnswers: Number = 0;
    ReadingWrongAnswers: Number = 0;

    WrtingScore: Number = 0;
    SpeakingScore: Number = 0;

    VocabScore: Number = 0;
    VocabCorrectAnswers: Number = 0;
    VocabWrongAnswers: Number = 0;

    SlangScore: Number = 0;
    SlangCorrectAnswers: Number = 0;
    SlangWrongAnswers: Number = 0;
}