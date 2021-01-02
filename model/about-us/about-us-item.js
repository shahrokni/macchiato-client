var mongoose = require('mongoose');
var aboutUsItemSchema = mongoose.Schema({
    type:{type:mongoose.Schema.Types.String, required:true},
    language:{type:mongoose.Schema.Types.String, required:true},
    order:{type:mongoose.Schema.Types.Number, required:true},
    Text:{type:mongoose.Schema.Types.String},
    Url:{type:mongoose.Schema.Types.String}
});

module.exports = aboutUsItemSchema;