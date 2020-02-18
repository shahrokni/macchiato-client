export function checkEmailFormat(email){

  // TODO Check whether emails can start with a numeric value!?
  let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  let result = regex.test(email);
  
  return result;
}

export function checkNameFormat(name){

    // TODO: The total lenght of names must be less than 50 charactes!
    let regex = /^[a-z ,.'-]+$/i;
    let result = regex.test(name);
    return result; 
    
}

export function checkStrongPassword(password){

    let result = false;

    if(password.length>=5){
        result = true;
    }

    return result;
}

export function checkUserName(username){
    
    //TODO: The total length of the user name must be restricted!
    let regex = /^[a-zA-Z0-9]+([_ - .]?[a-zA-Z0-9])*$/;
    let result  = regex.test(username);   

    return result;
}

export function checkCellphone(cellphone){

    //TODO : Should we consider international numbers!?
    let regex = /^(09)\d{9}/;
    let result = regex.test(cellphone);

    return result;
}