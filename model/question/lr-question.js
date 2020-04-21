var mongoose = require('mongoose');
var answerSchema = require('../answer/answer');
/*---------------------------------*/
var lrQuestion = mongoose.Schema({

    questionItems:[mongoose.Schema.Types.String],
    answerItems:[answerSchema],
    readingQuestion:{type:mongoose.Schema.Types.ObjectId, ref:'readingQuestion'},
    listeningQuestion:{type:mongoose.Schema.Types.ObjectId, ref:'listeningQuestion'}
});
let LRQuestion = mongoose.model('LRQuestion',lrQuestion);
module.exports.LRQuestion = LRQuestion;