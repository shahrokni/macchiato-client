import { Skill } from "./skill";

export class MockExam {

    id: Number = 0;
    beginDate: Date = new Date();
    timeLimit: Number = 0;
    skills: Array<Skill> = new Array<Skill>();
    cost: Number = 0;
    avialableSeat: Number = 0;
}