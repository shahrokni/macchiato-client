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

    userController.updateUserInformation(req.body, req.user._id, (response) => {

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
api.get('/user/email',isUserAuthenticated,(req,res)=>{
    userController.getEmail(req.user._id).then((response)=>{
        res.json({response:response});
        return;
    })
})

//Update the cellphone
api.put('/user/cellphone',isUserAuthenticated,(req,res)=>{
    userController.updateCellphone(req.body.cellphone,req.user_id)
    .then((response)=>{
        res.json({response:response});
        return;
    })
});

//Fetch the cellphone
api.get('/user/cellphone',isUserAuthenticated,(req,res)=>{
    userController.getCellphone(req.user._id).then((response)=>{
        res.json({response:response});
        return;
    })
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

    const practiceType = req.query.type;
    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    userController.getScore(req.user._id).then((scoreObject) => {

        response.isSuccessful = true;
        response.outputJson = { score: 0, practiceType: practiceType };

        switch (practiceType) {
            case 'Listening':
                response.outputJson.score = scoreObject.listeningScore;
                break;
            case 'Reading':
                response.outputJson.score = scoreObject.readingScore;
                break;
            case 'Writing':
                response.outputJson.score = scoreObject.writingScore;
                break;
            case 'Speaking':
                response.outputJson.score = scoreObject.speakingScore;
                break;
            case 'Slang':
                response.outputJson.score = scoreObject.slangScore;
                break;
            case 'Vocabulary':
                response.outputJson.score = scoreObject.vocabScore;
                break;
            default:
                response.outputJson.score = 0;
        }
        res.json({ response: response });
        return;
    })
        .catch((err) => {
            response.isSuccessful = false;
            response.outputJson = {};
            response.serverValidations.push(global.errorResource.Err0000());
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