var Question = require('../../model/question/question');
var LRQuestion = require('../../model/question/lr-question');
var ReadingQuestion = require('../../model/question/reading-question');
var answerSchema = require('../../model/answer/answer');
var mongoose = require('mongoose');
/*-----------------------------------------------------*/

async function generateNextQueryNumber() {

}


async function createReadinQuestion(question) {

   const session = await Question.Question.startSession();
   session.startTransaction();

   try{

    const opt = {session};
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
    await newQuestion.save(opt);    
    await session.commitTransaction();    
    session.endSession();

   }
   catch(err){

    console.log(err);
    await session.abortTransaction();
    session.endSession();
    // throw error; 
   }
}


function addNewReadingQuestion(question, done) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
    createReadinQuestion(question);

}
module.exports.addNewReadingQuestion = addNewReadingQuestion;