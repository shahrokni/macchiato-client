var mongoose = require('mongoose');
/*----------------------------------------*/
var questionSchema = mongoose.Schema({

    number:{type:mongoose.Schema.Types.String,require:true, unique:true},
    title:{type:mongoose.Schema.Types.String, required:true},
    hardness:{type:mongoose.Schema.Types.String, required:true},
    creationDate:{type:mongoose.Schema.Types.Date, required:true},
    type:{type:mongoose.Schema.Types.String, required:true},
    answerDuration:{type:mongoose.Schema.Types.Number, required:true, default:6000},
    score2Asset:{type:mongoose.Schema.Types.Boolean, required:true, default:false},
    score:{type:mongoose.Schema.Types.Number, required:true, default:0},
    usage:[mongoose.Schema.Types.String],
    genre:[mongoose.Schema.Types.String],
    hashtags:[mongoose.Schema.Types.String],
    lrQuestion:{type:mongoose.Schema.Types.ObjectId, ref:'lrquestions'},
    swQuestion:{type:mongoose.Schema.Types.ObjectId, ref:'swquestions'},
    vocabSlangQuestion:{type:mongoose.Schema.Types.ObjectId, ref:'vocabslangquestions'}
});
var Question = mongoose.model('Question',questionSchema);
module.exports.Question = Question;