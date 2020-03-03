import { MockExam } from "./mock-exam";


export class MockExamDetail extends MockExam {

    constructor() {
        /* Array of QuestionAnswer */
        this.questions = new Array();
    }
}