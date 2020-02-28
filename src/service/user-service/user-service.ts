import { UserDetail } from '../../entity/user/userDetail';
import User  from '../../entity/user/user';
import { validateSignUpData } from '../../util/validation/user-validation';
import  Response  from '../../communication/entity/response';
import RestProvider from '../../communication/entity/rest-provider';
import ErrorMessage from '../../resource/text/error-message';


export default class UserService {

    //TODO: You need to review ES6 OOP features before you continue this part!

    getUser(user: User): Response {
       
        //validation
       if(user == null || user.studentNumber == null || user.studentNumber===""){
            let result = new Response();
            result.isSuccessful = false;
            result.clientValidations.push(ErrorMessage.ErrBu0001());
            return result;
       }

        //creating instance
        let instance = RestProvider.createInstance(1500);
        
        //Calling get method and return the result
        instance.get('/users', { params: { studentNumber: user.studentNumber } }).then(function (response: string) {            
            return JSON.parse(response);
        })
        //Catching error
        .catch(function (error: any) {
             let response = new Response();
             response.isSuccessful=false;            
             return response;
            });      
        //TODO: check if this return statement can be removed.
            return new Response();
    }

    signUp(userDetail: UserDetail): Response {

        let errorArray = validateSignUpData(userDetail);

        if (errorArray.length !== 0) {
            // Redirect to Global Message Component for showing a proper message!
        }
        return new Response();
    }

    signIn(user: User): Response {
        return new Response();
    }

    update(userDetail: UserDetail) {

    }

    logOut(user: User): Response {
        return new Response();
    }

}