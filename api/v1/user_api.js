var userController = require('../../controller/v1/user-controller');
/*------------------------------------------------*/
var passport = require('passport');
var express = require('express');
const bodyParser = require('body-parser');
/*-------------------------------------------------*/
var api = express.Router();
api.use(bodyParser.json());
/*------------------FUNCTIONS----------------------*/

//Check if the user is authenticated
function isUserAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {

        next();
    }
    else {

        res.redirect(303, '/user_api/v1/notlogedIn');
    }
}

//Save the new user
api.post('/user', async (req, res) => {
    await userController.registerUser(req.body)
        .then((response) => {

            res.json({ response: response });
            return;
        });
});


//Update the user information
api.put('/user', isUserAuthenticated, (req, res) => {

    userController.updateUserInformation(req.body.userDetail, req.user._id, (response) => {

        res.json({ response: response });
        return;
    });
});

// Get the detailed user information
api.get('/userDetail', isUserAuthenticated, (req, res) => {

    userController.getDetailedUserInformation(req.user._id, (response) => {

        res.json({ response: response });
        return;
    });
});

//Update the email
api.put('/user/email', isUserAuthenticated, (req, res) => {

    userController.updateUserEmail(req.body.newEmail, req.user._id)
        .then((response) => {
            res.json({ response: response });
            return;
        })
});

// Fetch the email
api.get('/user/email', isUserAuthenticated, (req, res) => {
    userController.getEmail(req.user._id).then((response) => {
        res.json({ response: response });
        return;
    })
})

//Update the cellphone
api.put('/user/cellphone', isUserAuthenticated, (req, res) => {
    userController.updateCellphone(req.body.cellphone, req.user._id)
        .then((response) => {           
            res.json({ response: response });
            return;
        })
});

//Fetch the cellphone
api.get('/user/cellphone', isUserAuthenticated, (req, res) => {
    userController.getCellphone(req.user._id).then((response) => {
        res.json({ response: response });
        return;
    })
});

/* Fetch User Joined With Detail */
api.get('/user/userjoineddetail',isUserAuthenticated,(req,res)=>{
    userController.getUserJoinedDetail(req.user._id).then((response)=>{
        res.json({response:response});
        return;
    });
});
//Change the password
api.put('/user/password', isUserAuthenticated, (req, res) => {

    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let repeatedNewPassword = req.body.repeatedNewPassword;
    userController.changeUserPassword(oldPassword, newPassword, repeatedNewPassword, req.user._id, (response) => {

        res.json({ response: response });
        return;
    });
});

//Check if user is authenticated
api.get('/user/isAuthenticated', isUserAuthenticated, (req, res) => {

    let response = new global.responseClass();
    response.isSuccessful = true;
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();   
    res.json({ response: response });
    return;
});

//Get score
api.get('/user/score', isUserAuthenticated, (req, res) => {
    userController.getScore(req.user._id).then((response) => {
        res.json({ response: response });
        return;
    })
});

/*------------------------------LOGIN----------------------------------*/
api.post('/user/login', passport.authenticate('login', {
    successRedirect: 'successfulLogin',
    failureRedirect: 'failedLogin',
}));
/*-------------LOGIN WITH AUTHKEY----------------*/
api.post('/user/loginwithauthkey', passport.authenticate('login', {
    successRedirect: 'successfulLogin',
    failureRedirect: 'failedLogin',
}));
/*-----------------------------------------------*/
api.get('/user/successfulLogin', (req, res) => {

    let response = new global.responseClass();
    response.isSuccessful = true;
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
    res.json({ response: response });
    return;
});

api.get('/user/failedLogin', (req, res) => {

    let response = new global.responseClass();
    response.isSuccessful = false;
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
    response.serverValidations.push(global.errorResource.ErrBu0016());

    res.json({ response: response });
    return;
});
/*----------- LOGIN AND SAVE AUT KEY (RMEMBER ME) ---------*/
api.post('/user/login_set_remember', passport.authenticate('login', {

    successRedirect: 'save_authkey_successfulLogin',
    failureRedirect: 'failedLogin',
}));

api.get('/user/save_authkey_successfulLogin', async (req, res) => {

    await userController.saveAuthKey4User(req.user._id).then((response) => {

        res.json({ response: response });
        return res;
    });
});

/*------------------------------------------------*/
api.get('/user/logout', (req, res) => {

    req.logout();
    res.redirect('logedout');
});

api.get('/user/logedout', (req, res) => {
    let response = new global.responseClass();
    response.isSuccessful = true;
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
    res.json({ response: response });
    return res;
});

/*-----------------------------------------------*/
api.get('/notlogedIn', (req, res) => {

    let response = new global.responseClass();
    response.isSuccessful = false;
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
    response.serverValidations.push(global.errorResource.ErrBu0017());
    res.json({ response: response });
    return res;
});

module.exports = api;