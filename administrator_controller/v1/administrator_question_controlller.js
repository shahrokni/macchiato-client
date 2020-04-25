var Question = require('../../model/question/question');
var LRQuestion = require('../../model/question/lr-question');
var SWQuestion = require('../../model/question/sw-question');
var ReadingQuestion = require('../../model/question/reading-question');
var ListeningQuestion = require('../../model/question/listening-question');
var VisualQuestion = require('../../model/question/visual-question');
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

        case 'Reading':
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
        .then((countedQuestions) => {

            let newNumber = startNumber + countedQuestions;
            questionNumber += newNumber;
        })
        .catch((reason) => {

            console.log(reason);
            throw global.errorResource.ErrBu0023();
        });

    return questionNumber;
}

async function createBaseQuestionPart(question, sessionOption) {

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

    await newQuestion.save(sessionOption).then((savedBaseQuestion) => {

        baseQuestionId = savedBaseQuestion._id;
    })
        .catch((reason) => {

            console.log(reason);
            throw global.errorResource.ErrBu0024();
        });

    return baseQuestionId;
}

async function createSWQuestionPart(question, sessionOption) {

    let swQuestionId = '';
    let newSWQuestion = new SWQuestion.SWQuestion();
    newSWQuestion.questionItems = question.questionItems;
    newSWQuestion.cost = question.cost;
    newSWQuestion.context = question.context;

    await newSWQuestion.save(sessionOption)
        .then((savedSWQuestion) => {

            swQuestionId = savedSWQuestion._id;
        })
        .catch((exception) => {

            console.log(exception);
            throw global.errorResource.ErrBu0024();
        });

    return swQuestionId;
}
async function createLRQuestionPart(question, sessionOption) {

    let lrQuestionNumber = '';
    let newlrQuestion = new LRQuestion.LRQuestion();
    newlrQuestion.questionItems = question.questionItems;

    //Add answer items
    question.answerItems.forEach(answeritem => {

        let answerModel = mongoose.model('AnswerItem', answerSchema);
        let newAnswerItem = new answerModel();
        newAnswerItem.answerType = answeritem.answerType;
        newAnswerItem.correctAnswer = answeritem.correctAnswer;

        if (answeritem.multipleChoice && answeritem.multipleChoice.length > 0) {

            newAnswerItem.multipleChoice = answeritem.multipleChoice;
        }
        newlrQuestion.answerItems.push(newAnswerItem);
    });

    await newlrQuestion.save(sessionOption).then((savedLRQuestion) => {

        lrQuestionNumber = savedLRQuestion._id;
    })
        .catch((reason) => {

            console.log(reason);
            throw global.errorResource.ErrBu0024();
        });

    return lrQuestionNumber;
}

async function createReadingQuestionPart(question, opt) {

    let readinQuestionId = '';
    let readingQuestion = new ReadingQuestion.ReadingQuestion();
    readingQuestion.context = question.context;

    await readingQuestion.save(opt).then((savedReadingQuestion) => {

        readinQuestionId = savedReadingQuestion._id
    }).catch((reason) => {

        console.log(reason);
        throw global.errorResource.ErrBu0024();
    });

    return readingQuestion;
}

async function connectBase2LR(baseId, lRId, opt) {

    try {

        let baseQuestion = await Question.Question.findById(baseId, null, opt);
        baseQuestion.lrQuestion = lRId;
        await baseQuestion.save(opt);
    }
    catch (exception) {

        throw global.errorResource.ErrBu0024();
    }

}

async function connectLR2Reading(lRId, readingId, opt) {

    try {

        let lRQuestion = await LRQuestion.LRQuestion.findById(lRId, null, opt);
        lRQuestion.readingQuestion = readingId;
        await lRQuestion.save(opt);
    }
    catch (exception) {

        console.log(exception);
        throw global.errorResource.ErrBu0024();
    }

}

async function createReadinQuestion(question) {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const opt = { session };
        let newBaseQuestionId = await createBaseQuestionPart(question, opt);
        let newLRQuestionId = await createLRQuestionPart(question, opt);
        let newReadingQuestionId = await createReadingQuestionPart(question, opt);
        await connectBase2LR(newBaseQuestionId, newLRQuestionId, opt);
        await connectLR2Reading(newLRQuestionId, newReadingQuestionId, opt);

        //Commit transaction and end session
        await session.commitTransaction();
        session.endSession();
    }
    catch (exception) {

        console.log(exception);
        //Abort transaction and end session
        await session.abortTransaction();
        session.endSession();
        throw exception;
    }
}

async function connectLR2Listening(lRId, listeningId, opt) {

    try {

        let lRQuestion = await LRQuestion.LRQuestion.findById(lRId, null, opt);
        lRQuestion.listeningQuestion = listeningId;
        await lRQuestion.save(opt);
    }
    catch (exception) {

        console.log(exception);
        throw global.errorResource.ErrBu0024();
    }
}

async function createListeningQuestionPart(newLRQuestionId, sessionOption) {

    let newListeningQuestionId = '';
    const fileType = '.mp3'
    let listeningQuestion = new ListeningQuestion.ListeningQuestion();
    listeningQuestion.audioFileName = newLRQuestionId + fileType;
    await listeningQuestion.save(sessionOption)
        .then((savedListeningQuestion) => {

            newListeningQuestionId = savedListeningQuestion._id;
        })
        .catch((exception) => {

            console.log(exception);
            throw global.errorResource.ErrBu0024();
        });

    return newListeningQuestionId;
}

async function createListeningQuestion(question) {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const opt = { session };
        let newBaseQuestionId = await createBaseQuestionPart(question, opt);
        let newLRQuestionId = await createLRQuestionPart(question, opt);
        let newListeningQuestionId = await createListeningQuestionPart(newLRQuestionId, opt);
        await connectBase2LR(newBaseQuestionId, newLRQuestionId, opt);
        await connectLR2Listening(newLRQuestionId, newListeningQuestionId, opt);

        //commit the transaction and end the session
        await session.commitTransaction();
        session.endSession();

    }
    catch (exception) {

        console.log(exception);
        //Abort transaction and end session
        await session.abortTransaction();
        session.endSession();
        throw exception;
    }
}

async function connectBase2SW(baseQuestionId, sWQuestionId, opt) {

    try {

        let baseQuestion = await Question.Question.findById(baseQuestionId, null, opt);
        baseQuestion.swQuestion = sWQuestionId;
        await baseQuestion.save(opt);
    }
    catch (exception) {

        console.log(exception);
        throw global.errorResource.ErrBu0024();
    }
}

async function createWritingQuestion(question) {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const opt = { session };
        let newBaseQuestionId = await createBaseQuestionPart(question, opt);
        let newSWQuestionId = await createSWQuestionPart(question, opt);
        await connectBase2SW(newBaseQuestionId, newSWQuestionId, opt);

        //commit the transaction and end the session
        await session.commitTransaction();
        session.endSession();
    }
    catch (exception) {

        console.log(exception);
        //Abort transaction and end session
        await session.abortTransaction();
        session.endSession();
        throw exception;
    }
}

async function createVisualQuestion(question) {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const opt = { session };
        let newBaseQuestionId = await createBaseQuestionPart(question, opt);
        let newSWQuestionId = await createSWQuestionPart(question, opt);
        let newVisualQuestionId = await createVisualQuestionPart(question, newSWQuestionId, opt);
        await connectBase2SW(newBaseQuestionId, newSWQuestionId, opt);
        await connectSw2Visual(newSWQuestionId, newVisualQuestionId, opt);

        //commit the transaction and end the session
        await session.commitTransaction();
        session.endSession();
    }
    catch (exception) {

        console.log(exception);
        //Abort transaction and end session
        await session.abortTransaction();
        session.endSession();
        throw exception;
    }
}
async function createVisualQuestionPart(question, swQuestionId, opt) {

    let newVisualQuestionId = '';
    let fileType = '.png';
    let visualQuestion = new VisualQuestion.VisualQuestion();
    visualQuestion.imageFileName = swQuestionId + fileType;
    visualQuestion.answerType = question.answerType;
    await visualQuestion.save(opt)
        .then((savedVisualQuestion) => {

            newVisualQuestionId = savedVisualQuestion._id;
        })
        .catch((exception) => {

            console.log(exception);
            throw global.errorResource.ErrBu0024();
        });

    return newVisualQuestionId;
}

async function connectSw2Visual(swQuestionId, visualQuestionId, opt) {

    try {

        let swQuestion = await SWQuestion.SWQuestion.findById(swQuestionId, null, opt);
        swQuestion.visualQuestion = visualQuestionId;
        await swQuestion.save(opt);
    }
    catch (exception) {

        console.log(exception);
        throw global.errorResource.ErrBu0024();
    }
}

async function createSpeakingQuestion(question){
    
    const session = await mongoose.startSession();
    session.startTransaction();

    try{

        const opt = { session };
        let newBaseQuestionId = await createBaseQuestionPart(question, opt);
        let newSWQuestionId = await createSWQuestionPart(question, opt);
        await connectBase2SW(newBaseQuestionId, newSWQuestionId, opt);

        //commit the transaction and end the session
        await session.commitTransaction();
        session.endSession();

    }
    catch(exception){

        console.log(exception);
        //Abort transaction and end session
        await session.abortTransaction();
        session.endSession();
        throw exception;
    }
}
/*------------------------------------------------------------------*/
/*------------------------------------------------------------------*/
/*------------------------------------------------------------------*/
/*------------------------------------------------------------------*/
/*---------------------- EXPOSED FUNCTIONS--------------------------*/
async function addNewReadingQuestion(question) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    await createReadinQuestion(question);
}
module.exports.addNewReadingQuestion = addNewReadingQuestion;
//--------------------------------------------------------------
async function addNewListeningQuestion(question) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    await createListeningQuestion(question);
}
module.exports.addNewListeningQuestion = addNewListeningQuestion;
//---------------------------------------------------------------
async function addNewWritingQuestion(question) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    await createWritingQuestion(question);
}
module.exports.addNewWritingQuestion = addNewWritingQuestion;
//-------------------------------------------------------------
async function addNewVisualQuestion(question) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    await createVisualQuestion(question);
}
module.exports.addNewVisualQuestion = addNewVisualQuestion;
//-------------------------------------------------------------
async function addNewSpeakingQuestion(question){
    
    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    await createSpeakingQuestion(question);
}
module.exports.addNewSpeakingQuestion = addNewSpeakingQuestion;
//--------------------------------------------------------------