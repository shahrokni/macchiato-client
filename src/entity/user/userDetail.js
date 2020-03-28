import User from "./user";
import { Gender } from "./gender";
import { SkillScore } from "./skill-score";
import {Province} from '../global/province';

export class UserDetail extends User {

    constructor() {
        super();
        this.registerationDate = new Date();
        this.email = "";
        this.birthDate = undefined;
        this.gender = Gender.NotSet;
        this.cellphone = "";
        this.skillScore = new SkillScore();
        this.province = Province.NotSet;
    }
}