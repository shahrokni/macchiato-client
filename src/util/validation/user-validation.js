
class UserValidation {

    constructor() {

        this.regexModule = require('../regex/string-regex');

        this.checkEmailFormatFunc = this.regexModule.checkEmailFormat;
        this.checkUserNameFunc = this.regexModule.checkUserName;
        this.checkNameFormatFunc = this.regexModule.checkNameFormat;
        this.checkPasswordFunc = this.regexModule.checkStrongPassword;
        this.checkCellphoneFunc = this.regexModule.checkCellphone;

        this.ErrorMessage = require('../../resource/text/error-message');
    }

    /*userDetail: UserDetail - output: String Array*/
    validateSignUpData(userDetail) {

        let errorMessages = [];

        if (userDetail == null)
            errorMessages.push(this.ErrorMessage.ErrBu0002());

        //Check user name 
        if (this.checkUserNameFunc(userDetail.userName) === false) {

            errorMessages.push(this.ErrorMessage.ErrBu0004());
        }

        //Check password
        if (userDetail.password === undefined || userDetail.password == null ||
            this.checkPasswordFunc(userDetail.password) === false) {

            errorMessages.push(this.ErrorMessage.ErrBu0006());
        }

        //Check name fromat
        if (this.checkNameFormatFunc(userDetail.name) === false || this.checkNameFormatFunc(userDetail.lastName) === false) {

            errorMessages.push(this.ErrorMessage.ErrBu0005());
        }

        //Check Gender
        if (!userDetail.gender) {

            errorMessages.push(this.ErrorMessage.ErrBu0012());
        }

        //Check province 
        if (!userDetail.province || userDetail.province === 'NotSet') {

            errorMessages.push(this.ErrorMessage.ErrBu0008());
        }
        return errorMessages;
    }

    validateChangePassword(oldPassword, newPassword, repeatNewPassword) {

        let errorMessages = [];

        if (newPassword == null || newPassword === undefined || this.checkPasswordFunc(newPassword) === false) {

            errorMessages.push(this.ErrorMessage.ErrBu0018());
        }

        if (repeatNewPassword == null || repeatNewPassword === undefined || this.checkPasswordFunc(repeatNewPassword) === false) {

            errorMessages.push(this.ErrorMessage.ErrBu0019());
        }

        if (repeatNewPassword !== newPassword) {

            errorMessages.push(this.ErrorMessage.ErrBu0020());
        }

        return errorMessages;
    }

    validateUpdateEmail(newEmail) {

        let errorMessages = [];

        if (this.checkEmailFormatFunc(newEmail) === false) {

            errorMessages.push(this.ErrorMessage.ErrBu0003());
        }
        return errorMessages;
    }

    validateUpdateCellphone(newCellphone) {

        let errorMessages = [];

        if (!this.checkCellphoneFunc(newCellphone)) {

            errorMessages.push(this.ErrorMessage.ErrBu0011());
        }

        return errorMessages;
    }

    /*userDetail: UserDetail - output: String Array*/
    validateUpdateData(userDetail) {
       
        let errorMessages = [];

        if (userDetail == null) {

            errorMessages.push(this.ErrorMessage.ErrBu0002());
        }

        if (this.checkNameFormatFunc(userDetail.name) === false || this.checkNameFormatFunc(userDetail.lastName) === false) {

            errorMessages.push(this.ErrorMessage.ErrBu0005());
        }
        
        if (!userDetail.birthDate || new Date(userDetail.birthDate).getTime() > Date.now()) {

            errorMessages.push(this.ErrorMessage.ErrBu0007());
        }

        if (!userDetail.province || userDetail.province === 'NotSet') {

            errorMessages.push(this.ErrorMessage.ErrBu0008());
        }

        if (!userDetail.gender) {

            errorMessages.push(this.ErrorMessage.ErrBu0012());
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

        errorMessages.push(this.ErrorMessage.Err0002());
        return errorMessages;
    }

    /*userFilter: UserFilter - output: String Array*/
    validateFetchUser(userFilter) {

        let errorMessages = [];

        if (!userFilter || (!userFilter.studentNumber && !userFilter.id)) {

            errorMessages.push(this.ErrorMessage.ErrBu0014());
        }

        return errorMessages;
    }
}

module.exports = UserValidation;




