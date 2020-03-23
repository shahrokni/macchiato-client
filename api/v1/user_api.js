/*--------------------------------------------------*/
var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
/*----------------------------------------------------*/
var express = require('express');
const bodyParser = require('body-parser');
/*-------------------------------------------------*/
var api = express.Router();
api.use(bodyParser.json());
/*--------------------------------------------------*/

api.post('/user', (req, res) => {

    let responseClass = require('../../src/communication/entity/response');
    let response = new responseClass();

    let errorResource = require('../../src/resource/text/error-message');

    let dateUtilModule = require('../../src/util/date-util/date-util');

    let userValidationClass = require('../../src/util/validation/user-validation');
    let userValidation = new userValidationClass();

    let errorMessages = userValidation.validateSignUpData(req.body);

    if (errorMessages != null && errorMessages.length != 0) {

        response.isSuccessful = false;
        response.operationTimestamp = dateUtilModule.getCurrentDateTime();
        response.setServerValidations(errorMessages);      
    }
    else {
        let User = require('../../model/user/user');
        let SkillScoreSchema = require('../../model/user/skill-score');       

        let newUser = new User({
            userName: req.body.userName,
            password: req.body.password,
            name: req.body.name,
            lastName: req.body.lastName,
            registerationDate: Date.now(),
            email: req.body.email,
            gender: req.body.gender,
            cellphone: req.body.cellphone,
            province: req.body.province
        });

        newUser.studentNumberPrefix = dateUtilModule.getCompactCurrentDate();

        let SkillScore = mongoose.model('SkillScore', SkillScoreSchema);
        newUser.skillScore.push(new SkillScore());

        newUser.save(function (err, user) {
            if (err) {

                console.log(err);
                response.isSuccessful = false;
                response.operationTimestamp = dateUtilModule.getCurrentDateTime();
                response.setServerValidations(errorMessages.push(errorResource.Err0000()));
            }
            else {
                //TODO: Delete this line later!
                console.log('user was saved successfully!');

                response.isSuccessful = true;
                response.operationTimestamp = dateUtilModule.getCurrentDateTime();
                response.outputJson = user;
            }
        });
    }  
   
    res.json({ reponse: response });
    //If you didn’t return, you’d continue on to the rest of the function and
    //you’d send the request twice, and Express would start throwing nasty errors
    return;
});

module.exports = api;