import User from "./user";
import { Gender } from "./gender";
import { SkillScore } from "./skill-score";

export class UserDetail extends User{

    registerationDate:Date=new Date();
    email:String="";
    userName:String="";
    birthDate:Date=new Date();
    gender:Gender=Gender.notSet;
    cellphone:String="";
    skillScore:SkillScore=new SkillScore;
}