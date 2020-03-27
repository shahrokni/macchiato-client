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
  

    let dateUtilModule = require('../../src/util/date-util/date-util');

    let responseClass = require('../../src/communication/entity/response');
    let response = new responseClass();
    response.isSuccessful = false;
    response.operationTimestamp = dateUtilModule.getCurrentDateTime();

    let errorResource = require('../../src/resource/text/error-message');    

    let userValidationClass = require('../../src/util/validation/user-validation');
    let userValidation = new userValidationClass();

    let errorMessages = userValidation.validateSignUpData(req.body);

    if (errorMessages != null && errorMessages.length != 0) {       
       
        response.serverValidations = errorMessages;
        res.json({response:response});
        return;

    }
    else {
        let User = require('../../model/user/user');
        let SkillScoreSchema = require('../../model/user/skill-score');

        let newUser = new User({
            userName: req.body.userName.toLowerCase(),
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

        
        let query = User.findOne({ 'userName': req.body.userName },'userName');
        
        query.exec(function (err, user) {

            if (!err) {

                //Check wether the chosen username has already been taken by another user
                if (user) {                 
                               
                    response.serverValidations.push(errorResource.ErrBu0009());
                    res.json({response:response});
                    return;                  
                }
                else {
                   
                    //Save new user
                    newUser.save(function (err, user) {
                        if (err) {
                      
                            response.serverValidations.push(errorResource.Err0000());
                            res.json({response:response});
                            return;
                        }
                        else {               

                            response.isSuccessful = true;                            
                            response.outputJson = user;
                            res.json({response:response});
                            return;
                        }
                    });
                }
            }
            else {           

                response.serverValidations.push(errorResource.Err0000());
                res.json({response:response});
                return;
            }
        });
    }  
});

module.exports = api;