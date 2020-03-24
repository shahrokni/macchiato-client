class ErrorMessage{

    static Err0000(){
        return "An unknown error occurred!";
    }

    static Err0001(){
        return "Server returned erro!";
    }

    static Err0002() {
        return "Something went wrong! Please try again or call the administration!";
    }
    /*------------------------------------------------------------ */
    //studentNumber
    static ErrBu0001(){
        return "Student number is not set!"
    }

    //user
    static ErrBu0002(){
        return "User information is not set!";
    }

    //email
    static ErrBu0003(){
        return "Email format is not correct!";
    }

    //username
    static ErrBu0004(){
        return "Username format is not correct!";
    }

    //name and lastName
    static ErrBu0005(){
        return "Either you name or last name format is not correct!";
    }
    
    //password
    static ErrBu0006(){
        return "Password format is not correct!";
    }

    //birthDate
    static ErrBu0007(){
        return "Birthdate format is not correct!";
    }

    //province 
    static ErrBu0008(){
        return "Province has not been set!";
    }
}
module.exports = ErrorMessage;