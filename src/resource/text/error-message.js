class ErrorMessage{

    static Err0000(){
        return "An unknown error occurred!";
    }

    static Err0001(){
        return "Server returned error!";
    }

    static Err0002() {
        return "Something went wrong! Please try again or call the administration!";
    }

    static Err0003(){
        return "The inappropriate request was prevented!";
    }

    static Err0004(){
        return "The Related document was not found!";
    }

    static Err0005(){

        return "The sent parameters are not valid!";
    }

    static Err0006(){

        return "Database error has occurred!";
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

    //username 2 
    static ErrBu0009(){

        return "Your desired username has already been taken!"
    }

    //user
    static ErrBu0010(){

        return "No related user was found!";
    }
    //cellphone 
    static ErrBu0011(){

        return "Cellphone format is not correct!";
    }

    //gender
    static ErrBu0012(){

        return "Gender is not set correctly!"
    }

    //email
    static ErrBu0013(){

        return "The email you are trying to use has already been taken!";
    }

    //user filter
    static ErrBu0014(){

        return "Filter has not been set properly!";
    }

    //َauthentication
    static ErrBu0015(){

        return "Please fill both username and password!";
    }
    
    //َauthentication 2
    static ErrBu0016(){

        return "Either username or password is not correct!";
    }

    //authentication 3 
    static ErrBu0017(){

        return "User is not authenticated!";
    }

    //new password
    static ErrBu0018(){

        return "New password format is not correct!";
    }

    //repeated new password
    static ErrBu0019(){

        return "Repeated new password format is not correct!";
    }

    //new and repeated passwords are not alike
    static ErrBu0020(){

        return "New and repeated passwords are not alike!";
    }
    //current password is nt correct
    static ErrBu0021(){

        return "The old password that you have entered is not correct!";
    }
    //advertisment
    static ErrBu0022(){

        return "Advertisment cannot be deleted by the applicaition users!"
    }
}
module.exports = ErrorMessage;