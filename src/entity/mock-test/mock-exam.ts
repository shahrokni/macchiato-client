import { Skill } from "./skill";

export class MockExam{

    id:Number;
    beginDate:Date;
    timeLimit:Number;
    skills:Array<Skill>;
    cost: Number;
    avialableSeat:Number;
}