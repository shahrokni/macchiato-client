var mongoose = require('mongoose');
/*------------------------------------------------*/
var paymentItemSchema = mongoose.Schema({

    transactionDate:{type:mongoose.Schema.Types.Date, require:true},
    amount:{type:mongoose.Schema.Types.Number,require:true},
    description : {type:mongoose.Schema.Types.String},
    isGift:{type:mongoose.Schema.Types.Boolean, require:true, default:false}
});
module.exports = paymentItemSchema;