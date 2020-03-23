

import Response  from '../../communication/entity/response';
import RestProvider from '../../communication/entity/rest-provider';
import ErrorMessages from '../../resource/text/error-message';

export default class UserService {   

    /*user: User - output:Response*/
    getUser(user){
       
        
        let dateUtil = require('../../util/date-util/date-util');

        let response = new Response();        

        let UserValidationClass =  require('../../util/validation/user-validation');
        let validator = new UserValidationClass();    
           
        let errorMessages = validator.validateGetUserData(user);

         if(errorMessages !=null && errorMessages.length!==0){
           
            response.isSuccessful =  false;
            response.operationTimestamp = dateUtil.getCurrentDateTime();
            response.setClientValidations(errorMessages);
            return response;
         }

        //creating instance
        let restInstance = RestProvider.createInstance(1500);
        
        //Calling get method and return the result
        restInstance.get('/users', { params: { studentNumber: user.studentNumber } }).then(function (res) {            
            return res.response;
        })
        //Catching the error
        .catch(function (error) {

            response.isSuccessful =  false;
            response.operationTimestamp = dateUtil.getCurrentDateTime();
            response.setClientValidations(errorMessages.push(ErrorMessages.Err0000()));
            return response;
        });        
    }

    /*userDetial: UserDetail - output: Response*/
    signUp(userDetail){

        let dateUtil = require('../../util/date-util/date-util');
        //Validattion
        let UserValidationClass =  require('../../util/validation/user-validation');
        let validator = new UserValidationClass();    

        let response = new Response();

        let errorMessages = validator.validateSignUpData(userDetail);
        if (errorMessages!=null && errorMessages.length !== 0) {
           
            response.isSuccessful = false;
            response.operationTimestamp = dateUtil.getCurrentDateTime();
            response.setClientValidations(errorMessages);           
            return response;
        }

        let restInstance = RestProvider.createInstance(1500);

        restInstance.post('user_api/v1/user',userDetail).then(function(res){
            return res.response;
        })
        .catch(function(err){
            response.isSuccessful =  false;
            response.operationTimestamp = dateUtil.getCurrentDateTime();
            response.setClientValidations(errorMessages.push(ErrorMessages.Err0000()));
            return response;
        });     
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