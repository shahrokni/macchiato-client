import { ExamType } from "./exam-type";

export class ExamPack {

    constructor() {

        this.questions = [];
        this.examType = ExamType.NotSet;       
        this.date = undefined;
        this.title = '';
    }

    getExamDuration() {

        let duration = 0;

        if (this.questions && this.questions.length > 0) {

            for (let i = 0; i < this.questions.length; i++) {

                duration+=this.questions[i].answerTime;
            }

            return duration;
        }
        return duration;
    }
}