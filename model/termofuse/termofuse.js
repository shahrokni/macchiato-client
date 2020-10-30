var mongoose = require('mongoose');
const termOfUseSchema = mongoose.Schema({
    description: {type:mongoose.Schema.Types.String, require:true},
    version:{type:mongoose.Schema.Types.Number, require:true, unique:true},
    creationDate:{type:mongoose.Schema.Types.Date, require:true}
});
const TermOfUse = mongoose.model('TermOfUse',termOfUseSchema);
module.exports = TermOfUse;