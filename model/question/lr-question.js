var mongoose = require('mongoose');
var answerSchema = require('../answer/answer');
/*---------------------------------*/
var lrQuestion = mongoose.Schema({

    questionItems:[mongoose.Schema.Types.String],
    answerItems:[answerSchema],
    readingQuestion:{type:mongoose.Schema.Types.ObjectId, ref:'ReadingQuestion'},
    listeningQuestion:{type:mongoose.Schema.Types.ObjectId, ref:'ListeningQuestion'}
});
let LRQuestion = mongoose.model('LRQuestion',lrQuestion);
module.exports.LRQuestion = LRQuestion;