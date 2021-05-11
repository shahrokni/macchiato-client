const mongoose = require('mongoose');
const userMessageSchema = mongoose.Schema({

    senderId:{type:mongoose.Schema.Types.String,require:true},
    receiverId:{type:mongoose.Schema.Types.ObjectId,require:true}, /*USER ID*/
    sentDate:{type:mongoose.Schema.Types.Date,require:true},
    isRead:{type:mongoose.Schema.Types.Boolean,require:true, default:false},
    isAdvertisement:{type:mongoose.Schema.Types.Boolean,default:false},
    title:{type:mongoose.Schema.Types.String,require:true},
    text:{type:mongoose.Schema.Types.String,require:true}
});
const UserMessage = mongoose.model('UserMessage', userMessageSchema);
function watchChangeHandler(data){
    if(data.operationType === 'insert'){        
        global.userMessageEventEmiiter
        .emit('insert',data.fullDocument.receiverId)
    } 
}
UserMessage.watch().on('change', watchChangeHandler);
module.exports = UserMessage;