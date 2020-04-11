var mongoose = require('mongoose');
var paymentItemSchema = require('./payment-item');
/*------------------------------------------------*/

var financialAccountSchema = mongoose.Schema({

    userId:{type:mongoose.Types.ObjectId,require:true, unique: true},
    currentBalance :{type:mongoose.Schema.Types.Number,require:true},
    paymentItems:[paymentItemSchema]
});

var FinancialAccount = mongoose.model('FinancialAccount',financialAccountSchema);
module.exports = FinancialAccount;