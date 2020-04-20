var mongoose = require('mongoose');
/*----------------------------------*/
var listeningQuestionSchema = new mongoose.Schema({
    audioLink:{type:mongoose.Schema.Types.String}
});
var ListeningQuestion = mongoose.model('ListeningQuestion',listeningQuestionSchema);
module.exports.ListeningQuestion = ListeningQuestion;