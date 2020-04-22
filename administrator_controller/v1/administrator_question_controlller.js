var Question = require('../../model/question/question');
var LRQuestion = require('../../model/question/lr-question');
var ReadingQuestion = require('../../model/question/reading-question');
var answerSchema = require('../../model/answer/answer');
var mongoose = require('mongoose');
/*-----------------------------------------------------*/

async function generateNextQueryNumber(questionType) {

    const reading = 'R';
    const listening = 'L'
    const writing = 'W';
    const speaking = 'S'
    const vocab = 'VOC';
    const visual = 'VIS';
    const slang = 'SLA';
    const startNumber = 10000;

    let questionNumber = '';

    switch (questionType) {

        case 'Reading' :
            questionNumber += reading;
            break;
        case 'Listening':
            questionNumber += listening;
            break;
        case 'Writing':
            questionNumber += writing;
            break;
        case 'Speaking':
            questionNumber += speaking;
            break;
        case 'Vocab':
            questionNumber += vocab;
            break;
        case 'Visual':
            questionNumber += visual;
            break;
        case 'Slang':
            questionNumber += slang;
            break;
    }

    await Question.Question.countDocuments({ 'number': '^' + questionNumber })
    .then((countedQuestions)=>{

        let newNumber = startNumber + countedQuestions;
        questionNumber += newNumber;                
    })
    .catch((reason)=>{

        console.log(reason);
        throw global.errorResource.ErrBu0023();
    });        

    return questionNumber;
}

async function createBaseQuestionPart(question,sessionOption){

    let baseQuestionId = '';

    let newQuestion = new Question.Question();
    newQuestion.title = question.title;
    newQuestion.hardness = question.hardness;
    newQuestion.creationDate = Date.now();
    newQuestion.type = question.type;
    newQuestion.answerDuration = question.answerDuration;
    newQuestion.score2Asset = question.score2Asset;
    newQuestion.score = question.score;
    newQuestion.usage = question.usage;
    newQuestion.genre = question.genre;
    newQuestion.hashtags = question.hashtags;
    newQuestion.number = await generateNextQueryNumber(question.type);
    
    await newQuestion.save(sessionOption).then((savedBaseQuestion)=>{

        baseQuestionId =  savedBaseQuestion._id;
    })
    .catch((reason)=>{
        
        throw global.errorResource.ErrBu0024();
    });

    return baseQuestionId;
}

async function createLRQuestionPart(question,sessionOption){

    let lrQuestionNumber = '';
    let newlrQuestion = new LRQuestion.LRQuestion();
    newlrQuestion.questionItems = question.questionItems;

    //Add answer items
    question.answerItems.forEach(answeritem => {
        
        let answerModel = mongoose.model('AnswerItem',answerSchema);
        let newAnswerItem = new answerModel();        
        newAnswerItem.answerType = answeritem.answerType;
        newAnswerItem.correctAnswer = answeritem.correctAnswer;

        if(answeritem.multipleChoice && answeritem.multipleChoice.length>0){

            newAnswerItem.multipleChoice= answeritem.multipleChoice;
        }
        newlrQuestion.answerItems.push(newAnswerItem);
    });

    await newlrQuestion.save(sessionOption).then((savedLRQuestion)=>{

        lrQuestionNumber = savedLRQuestion._id;
    })
    .catch((reason)=>{       
        
       throw global.errorResource.ErrBu0024();
    });   

    return lrQuestionNumber;
}

async function createReadinQuestion(question) {

    const session = await mongoose.startSession();
    session.startTransaction();
    try {

        const opt = { session };
        let newBaseQuestionId  = await createBaseQuestionPart(question,opt);
        let newLRQuestionId = await createLRQuestionPart(question,opt);        

        //Commit transaction and end session
        await session.commitTransaction();
        session.endSession();
    }
    catch (exception) {

        console.log(exception);

        //Abort transaction and end session
        await session.abortTransaction();
        session.endSession();
    }
}

/*---------------------- EXPOSED FUNCTIONS--------------------------*/
async function addNewReadingQuestion(question) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
    await createReadinQuestion(question);
}
module.exports.addNewReadingQuestion = addNewReadingQuestion;