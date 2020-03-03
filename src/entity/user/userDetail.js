import User from "./user";
import { Gender } from "./gender";
import { SkillScore } from "./skill-score";

export class UserDetail extends User {

    constructor() {
        this.registerationDate = new Date();
        this.email = "";
        this.birthDate = new Date();
        this.gender = Gender.NotSet;
        this.cellphone = "";
        this.skillScore = new SkillScore;
    }
}