import { MockSimpleReport } from "./mock-simple-report";
import { QuestionAnswer } from "../question-answer/question-answer";

export class MockVipReport extends MockSimpleReport{
    examItems: Array<QuestionAnswer> = new Array<QuestionAnswer>();
    writingNote:Array<String>=new Array<String>();
    speakinNote:Array<String> = new Array<String>();
}