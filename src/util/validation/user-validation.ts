import { UserDetail } from "../../entity/user/userDetail";
import User from "../../entity/user/user";
import ErrorMessage from "../../resource/text/error-message";
import {checkEmailFormat,checkUserName,checkNameFormat} from '../regex/string-regex';

/*---------------------------------------------------------------------------------*/

export function validateSignUpData(userDetail:UserDetail):Array<String>{

    let errorMessages = new Array<String>();

    if(UserDetail==null)
        errorMessages.push(ErrorMessage.ErrBu0002());   

    //Ceck email format
    if(checkEmailFormat(userDetail.email)===false){
        errorMessages.push(ErrorMessage.ErrBu0003());
    }
    //Check user name 
    if(checkUserName(userDetail.userName)===false){
        errorMessages.push(ErrorMessage.ErrBu0004());
    }
    //Check name fromat
    if(checkNameFormat(userDetail.name)===false || checkNameFormat(userDetail.lastName)===false){
        errorMessages.push(ErrorMessage.ErrBu0005());
    }

    return errorMessages;
}

export function validateUpdateData(userDetail:UserDetail):Array<String>{

    let errorMessages = new Array<String>();

    if(userDetail == null){
        errorMessages.push(ErrorMessage.ErrBu0002());
    }

    if(checkEmailFormat(userDetail.email)===false){
        errorMessages.push(ErrorMessage.ErrBu0003());
    }

    if(checkNameFormat(userDetail.name)===false || checkNameFormat(userDetail.lastName)===false){
        errorMessages.push(ErrorMessage.ErrBu0005());
    }

    if((userDetail.birthDate instanceof Date)===false){
        errorMessages.push(ErrorMessage.ErrBu0007());
    }

    return errorMessages;
}

export function validateGetUserData(user:User):Array<String>{

    
    if(user != null && user.studentNumber != null && user.studentNumber !==""){
        //return an empty array        
        return new Array<String>();
    }
        let errorMessages = new Array<String>();
        errorMessages.push(ErrorMessage.ErrBu0001());
        return errorMessages;   
}

export function validateSignIn(user:User):Array<String>{

    let errorMessages= new Array<String>();

    if(user == null){
        errorMessages.push(ErrorMessage.ErrBu0002());
    }

    if(checkUserName(user.userName)===false){
        errorMessages.push(ErrorMessage.ErrBu0004());
    }

    if(user.password == null || user.password===""){
        errorMessages.push(ErrorMessage.ErrBu0006());
    }

    return errorMessages;
}

export function validateLogOut(user :User):Array<String>{

    let errorMessages = new Array<String>();

    if(user!=null && user.studentNumber!=null && user.studentNumber!=null){
        return errorMessages;
    }

    //Do not show technical error to the user!
    errorMessages.push(ErrorMessage.Err0002());
    return errorMessages;
}