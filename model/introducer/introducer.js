const mongoose = require('mongoose');
const introducerContractSchema = require('./introducer-contract');
const introducerContactInfo = require('./introducer-contact-info');
/*--------------------------------*/
const introducer = mongoose.Schema({
    name:{type:mongoose.Schema.Types.String, require:true},
    code:{type:mongoose.Schema.Types.String, require:true, unique:true},
    isEnabled:{type:mongoose.Schema.Types.Boolean,require:true},    
    contactInfo: introducerContactInfo,
    introducerContractSchema: introducerContractSchema
});
const Introducer = mongoose.model('Introducer',introducer);
module.exports.Introducer = Introducer;