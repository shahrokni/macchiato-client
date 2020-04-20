var mongoose = require('mongoose');
/*---------------------------------*/
var readingQuestionSchema = new mongoose.Schema({

    context:{type:mongoose.Schema.Types.String}
});
let ReadingQuestion = mongoose.model('ReadingQuestion',readingQuestionSchema);
module.exports.ReadingQuestion = ReadingQuestion;