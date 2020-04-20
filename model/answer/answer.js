var mongoose = require('mongoose');
/*---------------------------------*/
var answerSchema = new mongoose.Schema({

    answerType:{type:mongoose.Schema.Types.String,required:true},
    correctAnswer:{type:mongoose.Schema.Types.String, required:true},
    //If it is a multiplechoise question, the following array is used
    multipleChoice:[mongoose.Schema.Types.String]
});
module.exports = answerSchema;