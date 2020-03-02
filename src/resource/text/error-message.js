"use strict";
exports.__esModule = true;
var ErrorMessage = /** @class */ (function () {
    function ErrorMessage() {
    }
    ErrorMessage.Err0000 = function () {
        return "An unknown error occurred!";
    };
    ErrorMessage.Err0001 = function () {
        return "Server returned erro!";
    };
    ErrorMessage.Err0002 = function () {
        return "Something went wrong! Please try again or call the administration!";
    };
    /*------------------------------------------------------------ */
    //studentNumber
    ErrorMessage.ErrBu0001 = function () {
        return "Student number is not set!";
    };
    //user
    ErrorMessage.ErrBu0002 = function () {
        return "User information is not set!";
    };
    //email
    ErrorMessage.ErrBu0003 = function () {
        return "Email format is not correct!";
    };
    //username
    ErrorMessage.ErrBu0004 = function () {
        return "Username format is not correct!";
    };
    //name and lastName
    ErrorMessage.ErrBu0005 = function () {
        return "Either you name or last name format is not correct!";
    };
    //password
    ErrorMessage.ErrBu0006 = function () {
        return "Password format is not correct!";
    };
    //birthDate
    ErrorMessage.ErrBu0007 = function () {
        return "Birthdate format is not correct!";
    };
    return ErrorMessage;
}());
exports["default"] = ErrorMessage;
