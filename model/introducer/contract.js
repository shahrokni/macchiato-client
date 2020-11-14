const mongoose = require('mongoose');
/*---------------------------------*/
const contractSchema = mongoose.Schema({
    percent:{type:mongoose.Schema.Types.Number, require:true},
    beginDate:{type:mongoose.Schema.Types.Date, require:true},
    endDate:{type:mongoose.Schema.Types.Date},
    isEnabled:{type:mongoose.Schema.Types.Boolean, require:true}
});
module.exports = contractSchema;