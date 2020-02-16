import { MockSimpleReport } from "./mock-simple-report";
import { QuestionAnswer } from "../question-answer/question-answer";

export class MockVipReport extends MockSimpleReport{
    examItems: Array<QuestionAnswer>;
    writingNote:Array<String>;
    speakinNote:Array<String>;
}