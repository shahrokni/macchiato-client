import { MockSimpleReport } from "./mock-simple-report";


export class MockVipReport extends MockSimpleReport {
    constructor() {
        /*QuestionAnswer Array*/
        this.examItems = new Array();
        /* String Array */
        this.writingNote = new Array();
        /* String Array */
        this.speakinNote = new Array();
    }
}