var UserMessage = require('../../model/user-message/user-message');
/*---------------FUNCTIONS-----------------*/

function isMessageRelated2User(messageId, userId, done) {

    let findQuery = UserMessage.findOne({ '_id': messageId, 'receiverId': userId });
    findQuery.exec((err, userMessage) => {

        if (!err) {

            if (userMessage)
                done(null, userMessage);
            else
                done(null, null);
        }
        else
            done(err, null);
    });
}

function getMessagesByUserId(page, userId, done) {

    let skip = page * 10;
    let limit = 10;
  
    UserMessage.find({ receiverId: userId },
        'receiverId sentDate isRead isAdvertisement title',
        { skip: skip, limit: limit }, (err, documents) => {

            if (!err) {
             
                done(null, documents);
            }
            else {

                done(err, null);
            }
        }).sort('sentDate').exec();
}

/*---------- EXPORTED FUNCTIONS-----------*/


function countUnreadMessages(userId, done) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    let countQuery = UserMessage.countDocuments({ 'receiverId': userId, 'isRead': false });
    countQuery.exec((err, counted) => {

        if (!err) {

            response.isSuccessful = true;
            let countClass = require('../../src/entity/global/count');
            let count = new countClass();
            count.countedItems = counted;
            response.outputJson = count;
        }
        else {

            response.isSuccessful = false;
            let message = global.dbExceptionHandler.tryGetErrorMessage(err);

            if (message != null)
                response.serverValidations.push(message);
            else
                response.serverValidations.push(global.errorResource.Err0000());
        }
        done(response);
    });
}

module.exports.countUnreadMessages = countUnreadMessages;

function setReadFlag(messageId, userId, done) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    isMessageRelated2User(messageId, userId, (err, fetchedMessage) => {

        if (!err) {

            if (fetchedMessage) {

                fetchedMessage.isRead = true;
                fetchedMessage.save((saveErr, savedMessage) => {

                    if (!saveErr) {

                        response.isSuccessful = true;
                        response.outputJson = savedMessage._id;
                    }
                    else {

                        response.isSuccessful = false;
                        let message = global.dbExceptionHandler.tryGetErrorMessage(err);

                        if (message != null)
                            response.serverValidations.push(message);
                        else
                            response.serverValidations.push(global.errorResource.Err0000());
                    }
                    done(response);
                });
            }
            else {

                response.isSuccessful = false;
                response.serverValidations.push(global.errorResource.Err0004());
                done(response);
            }
        }
        else {

            response.isSuccessful = false;
            let message = global.dbExceptionHandler.tryGetErrorMessage(err);

            if (message != null)
                response.serverValidations.push(message);
            else
                response.serverValidations.push(global.errorResource.Err0000());

            done(response);
        }
    });
}

module.exports.setReadFlag = setReadFlag;

function getMessage(messageId, userId, done) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    isMessageRelated2User(messageId, userId, (err, fetchedMessage) => {

        if (!err) {

            if (fetchedMessage) {

                response.isSuccessful = true;
                response.outputJson = fetchedMessage;
            }
            else {

                response.isSuccessful = false;
                response.serverValidations.push(global.errorResource.Err0004());
            }

            done(response);
        }
        else {

            response.isSuccessful = false;
            let message = global.dbExceptionHandler.tryGetErrorMessage(err);

            if (message != null)
                response.serverValidations.push(message);
            else
                response.serverValidations.push(global.errorResource.Err0000());

            done(response);
        }
    });
}

module.exports.getMessage = getMessage;

function getAllUserMessages(userId, page, done) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    getMessagesByUserId(page, userId, (err, messages) => {

        if (!err) {

            response.isSuccessful = true;
            response.outputJson = messages;

            done(response);
        }
        else {

            response.isSuccessful = false;
            let message = global.dbExceptionHandler.tryGetErrorMessage(err);

            if (message != null)
                response.serverValidations.push(message);
            else
                response.serverValidations.push(global.errorResource.Err0000());
            
            done(response);
        }      
    });  
}

module.exports.getAllUserMessages = getAllUserMessages;

function deleteUserMessage(messageId, userId, done) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
   
    isMessageRelated2User(messageId, userId, (err, fetchedUserMessage) => {

        if (!err) {

            if (fetchedUserMessage) {

                if (!fetchedUserMessage.isAdvertisement) {

                    UserMessage.deleteOne({ _id: fetchedUserMessage._id }, (err) => {

                        if (!err) {

                            response.isSuccessful = true;
                        }
                        else {

                            response.isSuccessful = false;
                            let message = global.dbExceptionHandler.tryGetErrorMessage(err);

                            if (message != null)
                                response.serverValidations.push(message);
                            else
                                response.serverValidations.push(global.errorResource.Err0000());

                        }

                        done(response);
                    });
                }
                else {

                    response.isSuccessful = false;
                    response.serverValidations.push(global.errorResource.ErrBu0022());

                    done(response);
                }
            }
            else {

                response.isSuccessful = false;
                response.serverValidations.push(global.errorResource.Err0004());

                done(response);
            }
        }
        else {

            response.isSuccessful = false;
            let message = global.dbExceptionHandler.tryGetErrorMessage(err);

            if (message != null)
                response.serverValidations.push(message);
            else
                response.serverValidations.push(global.errorResource.Err0000());

            done(response);

        }
    });
}
module.exports.deleteUserMessage = deleteUserMessage;