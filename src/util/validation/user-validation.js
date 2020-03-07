
class UserValidation {
 
    constructor(){

        this.regexModule = require('../regex/string-regex');
        
        this.checkEmailFormatFunc = this.regexModule.checkEmailFormat;
        this.checkUserNameFunc = this.regexModule.checkUserName;
        this.checkNameFormatFunc = this.regexModule.checkNameFormat;

        this.ErrorMessage = require('../../resource/text/error-message');
    }

    /*userDetail: UserDetail - output: String Array*/
    validateSignUpData(userDetail) {       

        let errorMessages = [];

        if (userDetail == null)
            errorMessages.push(this.ErrorMessage.ErrBu0002());

        //Ceck email format
        if (this.checkEmailFormatFunc(userDetail.email) === false) {
            errorMessages.push(this.ErrorMessage.ErrBu0003());
        }
        //Check user name 
        if (this.checkUserNameFunc(userDetail.userName) === false) {
            errorMessages.push(this.ErrorMessage.ErrBu0004());
        }
        //Check name fromat
        if (this.checkNameFormatFunc(userDetail.name) === false || this.checkNameFormatFunc(userDetail.lastName) === false) {
            errorMessages.push(this.ErrorMessage.ErrBu0005());
        }

        return errorMessages;        
    }


    /*userDetail: UserDetail - output: String Array*/
    validateUpdateData(userDetail) {
      
        let errorMessages = [];

        if (userDetail == null) {
            errorMessages.push(this.ErrorMessage.ErrBu0002());
        }

        if (this.checkEmailFormatFunc(userDetail.email) === false) {
            errorMessages.push(this.ErrorMessage.ErrBu0003());
        }

        if (this.checkNameFormatFunc(userDetail.name) === false || this.checkNameFormatFunc(userDetail.lastName) === false) {
            errorMessages.push(this.ErrorMessage.ErrBu0005());
        }

        if ((userDetail.birthDate instanceof Date) === false) {
            errorMessages.push(this.ErrorMessage.ErrBu0007());
        }

        return errorMessages;
    }



    /* user:User - output: String Array */
    validateGetUserData(user) {


        if (user != null && user.studentNumber != null && user.studentNumber !== "") {
            //return an empty array        
            return [];
        }
        let errorMessages = [];
        errorMessages.push(this.ErrorMessage.ErrBu0001());
        return errorMessages;
    }



    /*user: User - output: String Array */
    validateSignIn(user) {        

        let errorMessages = [];

        if (user == null) {
            errorMessages.push(this.ErrorMessage.ErrBu0002());
        }

        if (this.checkUserNameFunc(user.userName) === false) {
            errorMessages.push(this.ErrorMessage.ErrBu0004());
        }

        if (user.password == null || user.password === "") {
            errorMessages.push(this.ErrorMessage.ErrBu0006());
        }

        return errorMessages;
    }

    /*user: User - output: String Array*/
    validateLogOut(user) {

        let errorMessages = [];

        if (user != null && user.studentNumber != null && user.studentNumber != null) {
            return errorMessages;
        }

        //Do not show technical error to the user!
        errorMessages.push(this.ErrorMessage.Err0002());
        return errorMessages;
    }
}

module.exports = UserValidation;




