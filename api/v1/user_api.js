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

    const bcrypt = require('bcrypt-nodejs');
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
        res.json({ response: response });
        return;

    }
    else {
        let User = require('../../model/user/user');
        let SkillScoreSchema = require('../../model/user/skill-score');

        let newUser = new User({
            userName: req.body.userName.toLowerCase(),
            name: req.body.name,
            lastName: req.body.lastName,
            registerationDate: Date.now(),
            province: req.body.province
        });

        //Set the first part of student number
        newUser.studentNumber = dateUtilModule.getCompactCurrentDate();

        let SkillScore = mongoose.model('SkillScore', SkillScoreSchema);
        newUser.skillScore.push(new SkillScore());


        let query = User.findOne({ 'userName': req.body.userName }, 'userName');

        query.exec(function (queryError, user) {

            if (!queryError) {

                //Check wether the chosen username has already been taken by another user
                if (user) {

                    response.serverValidations.push(errorResource.ErrBu0009());
                    res.json({ response: response });
                    return;
                }
                else {

                    //Encrypt the user's password
                    bcrypt.hash(req.body.password, bcrypt.genSaltSync(5), null, function (bcryptError, hash) {

                        if (!bcryptError) {

                            newUser.password = hash;

                            User.countDocuments({ 'studentNumber': { $regex: '^' + newUser.studentNumber } }, function (countErr, count) {

                                if (countErr){

                                    let exceptionHandler =
                                        require('../../src/util/mongo-handler/mongo-exception-handler');

                                    let message = exceptionHandler.tryGetErrorMessage(countErr);

                                    if (message != null)
                                        response.serverValidations.push(message);
                                    else
                                        response.serverValidations.push(errorResource.Err0000());

                                    res.json({ response: response });
                                    return;

                                }
                                else {

                                    //Add the second part of the student number                                    
                                    newUser.studentNumber += count;

                                    //Save the new user
                                    newUser.save(function (err, user) {

                                        if (err) {
                                           
                                            let exceptionHandler =
                                                require('../../src/util/mongo-handler/mongo-exception-handler');

                                            let message = exceptionHandler.tryGetErrorMessage(err);

                                            if (message != null)
                                                response.serverValidations.push(message);
                                            else
                                                response.serverValidations.push(errorResource.Err0000());

                                            res.json({ response: response });
                                            return;
                                        }
                                        else {

                                            response.isSuccessful = true;
                                            user.password = '***';
                                            response.outputJson = user;
                                            res.json({ response: response });
                                            return;
                                        }
                                    });

                                }
                            }).exec();
                        }
                        else {

                            response.serverValidations.push(errorResource.Err0000());
                            res.json({ response: response });
                            return;
                        }
                    })
                }
            }
            else {

                let exceptionHandler =
                    require('../../src/util/mongo-handler/mongo-exception-handler');

                let message = exceptionHandler.tryGetErrorMessage(queryError);

                if (message != null)
                    response.serverValidations.push(message);
                else
                    response.serverValidations.push(errorResource.Err0000());

                res.json({ response: response });
                return;
            }
        });
    }
});

module.exports = api;