
import {checkEmailFormat, checkUserName, checkNameFormat} from "../regex/string-regex";
import ErrorMessage from "../../resource/text/error-message";

export class UserValidation {
 

    /*userDetail: UserDetail - output: String Array*/
    validateSignUpData(userDetail) {       

        let errorMessages = [];

        if (userDetail == null)
            errorMessages.push(ErrorMessage.ErrBu0002());

        //Ceck email format
        if (checkEmailFormat(userDetail.email) === false) {
            errorMessages.push(ErrorMessage.ErrBu0003());
        }
        //Check user name 
        if (checkUserName(userDetail.userName) === false) {
            errorMessages.push(ErrorMessage.ErrBu0004());
        }
        //Check name fromat
        if (checkNameFormat(userDetail.name) === false || checkNameFormat(userDetail.lastName) === false) {
            errorMessages.push(ErrorMessage.ErrBu0005());
        }

        return errorMessages;

        return [];
    }


    /*userDetail: UserDetail - output: String Array*/
    validateUpdateData(userDetail) {

        let { checkEmailFormat, checkNameFormat } =
             import('../regex/string-regex');

        let errorMessages = [];

        if (userDetail == null) {
            errorMessages.push(ErrorMessage.ErrBu0002());
        }

        if (checkEmailFormat(userDetail.email) === false) {
            errorMessages.push(ErrorMessage.ErrBu0003());
        }

        if (checkNameFormat(userDetail.name) === false || checkNameFormat(userDetail.lastName) === false) {
            errorMessages.push(ErrorMessage.ErrBu0005());
        }

        if ((userDetail.birthDate instanceof Date) === false) {
            errorMessages.push(ErrorMessage.ErrBu0007());
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
        errorMessages.push(ErrorMessage.ErrBu0001());
        return errorMessages;
    }



    /*user: User - output: String Array */
    validateSignIn(user) {


        let { checkUserName } =
             import('../regex/string-regex');

        let errorMessages = [];

        if (user == null) {
            errorMessages.push(ErrorMessage.ErrBu0002());
        }

        if (checkUserName(user.userName) === false) {
            errorMessages.push(ErrorMessage.ErrBu0004());
        }

        if (user.password == null || user.password === "") {
            errorMessages.push(ErrorMessage.ErrBu0006());
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
        errorMessages.push(ErrorMessage.Err0002());
        return errorMessages;
    }
}






