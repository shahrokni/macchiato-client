var mongoose = require('mongoose');
var answerSchema = require('../answer/answer');
/*---------------------------------*/
var lrQuestionSchema = mongoose.Schema({

    questionItems:[mongoose.Schema.Types.String],
    answerItems:[answerSchema],
    readingQuestion:{type:mongoose.Schema.Types.ObjectId, ref:'readingquestions'},
    listeningQuestion:{type:mongoose.Schema.Types.ObjectId, ref:'listeningquestions'}
});
let LRQuestion = mongoose.model('LRQuestion',lrQuestionSchema);
module.exports.LRQuestion = LRQuestion;