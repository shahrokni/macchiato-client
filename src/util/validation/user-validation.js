"use strict";
exports.__esModule = true;
var userDetail_1 = require("../../entity/user/userDetail");
var error_message_1 = require("../../resource/text/error-message");
var string_regex_1 = require("../regex/string-regex");
/*---------------------------------------------------------------------------------*/
function validateSignUpData(userDetail) {
    var errorMessages = new Array();
    if (userDetail_1.UserDetail == null)
        errorMessages.push(error_message_1["default"].ErrBu0002());
    //Ceck email format
    if (string_regex_1.checkEmailFormat(userDetail.email) === false) {
        errorMessages.push(error_message_1["default"].ErrBu0003());
    }
    //Check user name 
    if (string_regex_1.checkUserName(userDetail.userName) === false) {
        errorMessages.push(error_message_1["default"].ErrBu0004());
    }
    //Check name fromat
    if (string_regex_1.checkNameFormat(userDetail.name) === false || string_regex_1.checkNameFormat(userDetail.lastName) === false) {
        errorMessages.push(error_message_1["default"].ErrBu0005());
    }
    return errorMessages;
}
exports.validateSignUpData = validateSignUpData;
function validateUpdateData(userDetail) {
    var errorMessages = new Array();
    if (userDetail == null) {
        errorMessages.push(error_message_1["default"].ErrBu0002());
    }
    if (string_regex_1.checkEmailFormat(userDetail.email) === false) {
        errorMessages.push(error_message_1["default"].ErrBu0003());
    }
    if (string_regex_1.checkNameFormat(userDetail.name) === false || string_regex_1.checkNameFormat(userDetail.lastName) === false) {
        errorMessages.push(error_message_1["default"].ErrBu0005());
    }
    if ((userDetail.birthDate instanceof Date) === false) {
        errorMessages.push(error_message_1["default"].ErrBu0007());
    }
    return errorMessages;
}
exports.validateUpdateData = validateUpdateData;
function validateGetUserData(user) {
    if (user != null && user.studentNumber != null && user.studentNumber !== "") {
        //return an empty array        
        return new Array();
    }
    var errorMessages = new Array();
    errorMessages.push(error_message_1["default"].ErrBu0001());
    return errorMessages;
}
exports.validateGetUserData = validateGetUserData;
function validateSignIn(user) {
    var errorMessages = new Array();
    if (user == null) {
        errorMessages.push(error_message_1["default"].ErrBu0002());
    }
    if (string_regex_1.checkUserName(user.userName) === false) {
        errorMessages.push(error_message_1["default"].ErrBu0004());
    }
    if (user.password == null || user.password === "") {
        errorMessages.push(error_message_1["default"].ErrBu0006());
    }
    return errorMessages;
}
exports.validateSignIn = validateSignIn;
function validateLogOut(user) {
    var errorMessages = new Array();
    if (user != null && user.studentNumber != null && user.studentNumber != null) {
        return errorMessages;
    }
    //Do not show technical error to the user!
    errorMessages.push(error_message_1["default"].Err0002());
    return errorMessages;
}
exports.validateLogOut = validateLogOut;
