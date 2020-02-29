import { UserDetail } from '../../entity/user/userDetail';
import User  from '../../entity/user/user';
import { validateSignUpData,
    validateGetUserData,
    validateSignIn,
    validateUpdateData,
    validateLogOut } from '../../util/validation/user-validation';
import  Response  from '../../communication/entity/response';
import RestProvider from '../../communication/entity/rest-provider';


export default class UserService {

    //TODO: You need to review ES6 OOP features before you continue this part!

    getUser(user: User): Response {
       
        //validation
         let errorMessages = validateGetUserData(user);
         if(errorMessages !=null && errorMessages.length!==0){

             let result = new Response();
             result.isSuccessful =  false;
             
             for(let i=0; i<errorMessages.length; i++){
                 result.clientValidations.push(errorMessages[i]);
             }

             return result;
         }

        //creating instance
        let restInstance = RestProvider.createInstance(1500);
        
        //Calling get method and return the result
        restInstance.get('/users', { params: { studentNumber: user.studentNumber } }).then(function (response: string) {            
            return JSON.parse(response);
        })
        //Catching the error
        .catch(function (error: any) {
             let response = new Response();
             response.isSuccessful=false;            
             return response;
            });      
        //TODO: check if this return statement can be removed.
            return new Response();
    }

    signUp(userDetail: UserDetail): Response {

        //Validattion
        let errorMessages = validateSignUpData(userDetail);
        if (errorMessages!=null && errorMessages.length !== 0) {

            let result = new Response();
            result.isSuccessful = false;
            
            for(let i = 0 ; i<errorMessages.length; i++){
                result.clientValidations.push(errorMessages[i]);
            }
            return result;
        }

        let restInstance = RestProvider.createInstance(1500);
        //TODO: Calling Rest service
        return new Response();
    }

    signIn(user: User): Response {
        
        let errorMessages = validateSignIn(user);

        if(errorMessages!=null && errorMessages.length!==0){

            let result = new Response();
            result.isSuccessful = false;

            for(let i=0; i<errorMessages.length; i++){
                result.clientValidations.push(errorMessages[i]);
            }

            return result;
        }

        let restInstance = RestProvider.createInstance(1500);
        //TODO: Calling Rest service
        return new Response();
    }

    update(userDetail: UserDetail) : Response {

        let errorMessages = validateUpdateData(userDetail);

        if(errorMessages!=null && errorMessages.length!==0){
            let result = new Response();
            result.isSuccessful=false;

            for(let i=0;i<errorMessages.length; i++){
                result.clientValidations.push(errorMessages[i]);
            }

            return result;
        }

        let restInstance = RestProvider.createInstance(1500);
        //TODO: Calling Rest service

        return new Response();
    }

    logOut(user: User): Response {

        let errorMessages = validateLogOut(user);

        if(errorMessages!=null && errorMessages.length!==0){
            let result = new Response();
            result.isSuccessful=false;

            for(let i=0;i<errorMessages.length;i++){
                result.clientValidations.push(errorMessages[i]);
            }
            return result;
        }
        
        let restInstance = RestProvider.createInstance(1500);
        //TODO: Call Rest service
        
        return new Response();
    }
}