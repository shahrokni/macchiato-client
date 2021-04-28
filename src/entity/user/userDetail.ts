import User from "./user";
import { Gender } from "./gender";
import SkillScore  from "./skill-score";
import {Province} from '../global/province';

export class UserDetail extends User {

    constructor() {

        super();
        this.name = '';
        this.lastName = '';
        this.studentNumber = '';
        this.registerationDate = null;
        this.email = '';
        this.birthDate = null;
        this.gender = Gender.NotSet;
        this.cellphone = '';
        this.skillScore = new SkillScore();
        this.province = Province.NotSet;
        this.introducerCode = '';
    }
    name:string;
    lastName:string;
    studentNumber:string;
    registerationDate:Date | null;
    email:string;
    birthDate:Date | null;
    gender:Gender | string;
    cellphone:string;
    skillScore:SkillScore;
    province:string;
    introducerCode:string
}