import { User } from "./user";
import { Gender } from "./gender";

export class UserDetail extends User{

    registerationDate:Date;
    email:String;
    userName:String;
    birthDate:Date;
    gender:Gender;    
}