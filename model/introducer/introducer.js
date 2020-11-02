const mongoose = require('mongoose');
const ContractSchema = require('./contract');
const introducerContactInfo = require('./introducer-contact-info');
/*--------------------------------*/
var introducer = mongoose.Schema({
    name:{type:mongoose.Schema.Types.String, require:true},
    code:{type:mongoose.Schema.Types.String, require:true, unique:true},
    isEnabled:{type:mongoose.Schema.Types.Boolean,require:true},    
    contactInfo: introducerContactInfo,
    contract: [ContractSchema]
});
const Introducer = mongoose.model('Introducer',introducer);
module.exports = Introducer;