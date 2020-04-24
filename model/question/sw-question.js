var mongoose = require('mongoose');
/*----------------------------------*/
var swQuestionSchema = mongoose.Schema({

    questionItems:[mongoose.Schema.Types.String],
    cost:{type:mongoose.Schema.Types.Number, require:true},
    context:{type:mongoose.Schema.Types.String, require:true}
});
var SWQuestion = mongoose.model('SWQuestion',swQuestionSchema);
module.exports.SWQuestion = SWQuestion;