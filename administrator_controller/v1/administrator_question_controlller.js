var Question = require('../../model/question/question');
var LRQuestion = require('../../model/question/lr-question');
var ReadingQuestion = require('../../model/question/reading-question');
var answerSchema = require('../../model/answer/answer');
var mongoose = require('mongoose');
/*-----------------------------------------------------*/

function generateNextQueryNumber() {

}

function createBaseQuestion() {

}

function createLRQuestion() {

}

function createReadingQuestion() {

}

function addNewReadingQuestion(question, done) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    mongoose.startSession((err, session) => {

        if (!err) {

            session.startTransaction().then(() => {

                let newQuestion = new Question.Question();
                newQuestion.title = question.title;
                newQuestion.hardness = question.hardnes;
                newQuestion.creationDate = Date.now();
                newQuestion.type = question.type;
                newQuestion.answerDuration = question.answerDuration;
                newQuestion.score2Asset = question.score2Asset;
                newQuestion.score = question.score;
                newQuestion.usage = question.usage;
                newQuestion.genre = question.genre;
                newQuestion.hashtags = question.hashtags;
                //newQuestion.questionNumber = generateNextQueryNumber();

                newQuestion.save((saveQuestionErr, savedQuestion) => {

                    if (!saveQuestionErr) {

                        let lrQuestion = new LRQuestion.LRQuestion();
                        lrQuestion.questionItems = question.questionItems;

                        question.lrQuestion.answerItems.forEach(answerItem => {

                            let AnswerModel = mongoose.model('Answer', answerSchema);
                            let answer = new AnswerModel();
                            answer.correctAnswer = answerItem.correctAnswer;
                            answer.answerType = answerItem.answerType;
                            answer.multipleChoice = answerItem.multipleChoice;
                            lrQuestion.answerItems.push(answer);
                        });

                        lrQuestion.save((saveDetailErr, savedLR) => {

                            if (!saveDetailErr) {

                                let ReadinQuestion = new ReadingQuestion.ReadingQuestion();
                                ReadingQuestion.context = question.context;
                                ReadinQuestion.save((saveReadingErr, savedreading) => {

                                    if (!saveReadingErr) {

                                        savedLR.readingQuestion = savedreading._id;
                                        savedLR.save((updateLRErr, updatedLR) => {

                                            if (!updateLRErr) {

                                                savedQuestion.lrQuestion = updatedLR._id;
                                                savedQuestion.save((updateQuestionErr, updatedQuestion) => {

                                                    if (!updateQuestionErr) {

                                                        session.commitTransaction(() => {

                                                            session.endSession(() => {

                                                                response.isSuccessful = true;
                                                                response.outputJson = updatedQuestion;
                                                                done(response);
                                                            });

                                                        });

                                                    }
                                                    else {

                                                        session.abortTransaction(() => {
                                                            session.endSession(() => {

                                                                response.isSuccessful = false;
                                                                response.response.serverValidations.push(global.errorResource.Err0006());
                                                                done(response);
                                                            });
                                                        });

                                                    }
                                                });
                                            }
                                            else {

                                                session.abortTransaction(() => {
                                                    session.endSession(() => {

                                                        response.isSuccessful = false;
                                                        response.response.serverValidations.push(global.errorResource.Err0006());
                                                        done(response);
                                                    });
                                                });
                                            }

                                        });
                                    }
                                    else {

                                        session.abortTransaction(() => {
                                            session.endSession(() => {

                                                response.isSuccessful = false;
                                                response.response.serverValidations.push(global.errorResource.Err0006());
                                                done(response);
                                            });
                                        });
                                    }
                                });
                            }
                            else {

                                session.abortTransaction(() => {
                                    session.endSession(() => {

                                        response.isSuccessful = false;
                                        response.response.serverValidations.push(global.errorResource.Err0006());
                                        done(response);
                                    });
                                });
                            }
                        });
                    }
                    else {

                        session.abortTransaction(() => {
                            session.endSession(() => {

                                response.isSuccessful = false;
                                response.response.serverValidations.push(global.errorResource.Err0006());
                                done(response);
                            });
                        });
                    }
                });
            }).catch((transactionErr) => {

                response.isSuccessful = false;
                response.response.serverValidations.push(global.errorResource.Err0006());
                done(response);
            });
        }
        else {

            response.isSuccessful = false;
            response.response.serverValidations.push(global.errorResource.Err0006());
            done(response);
        }
    });

}
module.exports.addNewReadingQuestion = addNewReadingQuestion;