import { Skill } from "./skill";

export class MockExam{
    examBeginDate:Date;
    timeLimit:Number;
    skills:Array<Skill>;
    cost: Number;
    avialableSeat:Number;
}