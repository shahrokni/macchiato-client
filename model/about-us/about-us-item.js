var mongoose = require('mongoose');
var aboutUsItemSchema = mongoose.Schema({
    type:{type:mongoose.Schema.Types.String, required:true},    
    order:{type:mongoose.Schema.Types.Number, required:true},
    header:{type:mongoose.Schema.Types.String},
    text:{type:mongoose.Schema.Types.String},
    url:{type:mongoose.Schema.Types.String}
});

module.exports = aboutUsItemSchema;