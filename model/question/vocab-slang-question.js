var mongoose  = require('mongoose');
var answerSchema = require('../answer/answer');
/*-----------------------------------*/
var vocabSlangQuestionSchema = mongoose.Schema({

    context:{type:mongoose.Schema.Types.String, require:true},
    answerItems:[answerSchema],
});

var VocabSlangQuestion = mongoose.model('VocabSlangQuestion',vocabSlangQuestionSchema);
module.exports.VocabSlangQuestion = VocabSlangQuestion;