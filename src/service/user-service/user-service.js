

import Response  from '../../communication/entity/response';
import RestProvider from '../../communication/entity/rest-provider';


export default class UserService {

    //TODO: You need to review ES6 OOP features before you continue this part!

    /*user: User - output:Response*/
    getUser(user){
       
         //validation
        let UserValidationClass =  require('../../util/validation/user-validation');
        let validator = new UserValidationClass();    
           
        let errorMessages = validator.validateGetUserData(user);

         if(errorMessages !=null && errorMessages.length!==0){

             let result = new Response();
             result.isSuccessful =  false;
             result.setClientValidations(errorMessages);          

             return result;
         }

        //creating instance
        let restInstance = RestProvider.createInstance(1500);
        
        //Calling get method and return the result
        restInstance.get('/users', { params: { studentNumber: user.studentNumber } }).then(function (response) {            
            return JSON.parse(response);
        })
        //Catching the error
        .catch(function (error) {
             let response = new Response();
             response.isSuccessful=false;            
             return response;
            });      
        //TODO: check if this return statement can be removed.
            return new Response();
    }

    /*userDetial: UserDetail - output: Response*/
    signUp(userDetail){

        //Validattion
        let UserValidationClass =  require('../../util/validation/user-validation');
        let validator = new UserValidationClass();    

        let errorMessages = validator.validateSignUpData(userDetail);
        if (errorMessages!=null && errorMessages.length !== 0) {

            let result = new Response();
            result.isSuccessful = false;
            result.setClientValidations(errorMessages);
           
            return result;
        }

        let restInstance = RestProvider.createInstance(1500);

        restInstance.post('user_api/v1/user',userDetail).then(function(response){
           
        })
        .catch(function(err){

        });
      
        return new Response();
    }

    /*user: User - output: Response*/
    signIn(user){
        
        let UserValidationClass =  require('../../util/validation/user-validation');
        let validator = new UserValidationClass();      
        
        let errorMessages = validator.validateSignIn(user);

        if(errorMessages!=null && errorMessages.length!==0){

            let result = new Response();
            result.isSuccessful = false;
            result.setClientValidations(errorMessages);
         
            return result;
        }

        let restInstance = RestProvider.createInstance(1500);
        //TODO: Calling Rest service
        return new Response();
    }

    /*userDetail: UserDetail-output: Reponse*/
    update(userDetail){

        let UserValidationClass =  require('../../util/validation/user-validation');
        let validator = new UserValidationClass();    

        let errorMessages = validator.validateUpdateData(userDetail);

        if(errorMessages!=null && errorMessages.length!==0){
            let result = new Response();
            result.isSuccessful=false;
            result.setClientValidations(errorMessages);

            return result;
        }

        let restInstance = RestProvider.createInstance(1500);
        //TODO: Calling Rest service

        return new Response();
    }

    /*user: User - output: Response*/
    logOut(user){

        let UserValidationClass =  require('../../util/validation/user-validation');
        let validator = new UserValidationClass();    
        let errorMessages = validator.validateLogOut(user);

        if(errorMessages!=null && errorMessages.length!==0){
            let result = new Response();
            result.isSuccessful=false;
            result.setClientValidations(errorMessages);
           
            return result;
        }
        
        let restInstance = RestProvider.createInstance(1500);
        //TODO: Call Rest service
        
        return new Response();
    }
}