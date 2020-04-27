import User from "../user/user";

export default class Administrator extends User{

    constructor(){

        this.name = '';
        this.isEnable = false;
        this.clerkNumber = '';
    }
}