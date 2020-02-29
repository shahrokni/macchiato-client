export default class ErrorMessage{

    static Err0000():String{
        return "An unknown error occurred!";
    }

    static Err0001():String{
        return "Server returned erro!";
    }

    static Err0002(): String {
        return "Something went wrong! Please try again or call the administration!";
    }
    /*------------------------------------------------------------ */
    //studentNumber
    static ErrBu0001():String{
        return "Student number is not set!"
    }

    //user
    static ErrBu0002():String{
        return "User information is not set!";
    }

    //email
    static ErrBu0003():String{
        return "Email format is not correct!";
    }

    //username
    static ErrBu0004():String{
        return "Username format is not correct!";
    }

    //name and lastName
    static ErrBu0005():String{
        return "Either you name or last name format is not correct!";
    }
    
    //password
    static ErrBu0006():String{
        return "Password format is not correct!";
    }

    //birthDate
    static ErrBu0007():String{
        return "Birthdate format is not correct!";
    }
}
