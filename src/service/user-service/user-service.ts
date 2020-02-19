import {UserDetail} from '../../entity/user/userDetail';
import { User } from '../../entity/user/user';
import {validateSignUpData} from '../../util/validation/user-validation';
import { ServerResponse } from '../../communication/entity/server-response';

export class UserService{

    //TODO: You need to review ES6 OOP features before you continue this part!

    getUser(user:User){

    }

    signUp(userDetail:UserDetail):ServerResponse{

        let errorArray = validateSignUpData(userDetail);

        if(errorArray.length!=0){
            // Redirect to Global Message Component for showing a proper message!
        }      
        return new ServerResponse();
    }

    signIn(user:User){

    }

    update(userDetail:UserDetail){

    }
    
    logOut(user:User){
        
    }

}