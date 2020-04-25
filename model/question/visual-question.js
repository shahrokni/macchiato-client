var mongoose = require('mongoose');
/*--------------------------------*/
var visualQuestionSchema = mongoose.Schema({

    imageFileName : {type:mongoose.Schema.Types.String, require:true},
    answerType : {type:mongoose.Schema.Types.String, require:true}
});

var VisualQuestion = mongoose.model('VisualQuestion',visualQuestionSchema);
module.exports.VisualQuestion = VisualQuestion;