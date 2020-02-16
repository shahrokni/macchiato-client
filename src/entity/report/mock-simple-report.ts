import { Report } from "./report";

export class MockSimpleReport extends Report{

    listeningScore : Number;
    listeningCorrectAnswers:Number;
    listeningWrongAnswers:Number;

    ReadingScroe:Number;
    ReadingCorrectAnswers:Number;
    ReadingWrongAnswers:Number;

    WrtingScore:Number;
    SpeakingScore:Number;

    VocabScore:Number;
    VocabCorrectAnswers:Number;
    VocabWrongAnswers:Number;
    
    SlangScore:Number;    
    SlangCorrectAnswers:Number;
    SlangWrongAnswers:Number;
}