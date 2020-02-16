import { User } from "./user";
import { Gender } from "./gender";
import { SkillScore } from "./skill-score";

export class UserDetail extends User{

    registerationDate:Date;
    email:String;
    userName:String;
    birthDate:Date;
    gender:Gender;
    cellphone:String;
    skillScore:SkillScore;
}