import { MockExam } from "./mock-exam";
import { QuestionAnswer } from "../question-answer/question-answer";

export class MockExamDetail extends MockExam{
    questions:Array<QuestionAnswer>=new Array<QuestionAnswer>();
}