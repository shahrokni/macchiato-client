function isUserAuthenticated(req,res,next){
    
    if(req.isAuthenticated()){

        next();
    }
    else{

        let response = new global.responseClass();
        response.isSuccessful = false;
        response.serverValidations.push(global.errorResource.ErrBu0017());
        res.json({response:response});
        return;
    }
}
module.exports.isUserAuthenticated = isUserAuthenticated;