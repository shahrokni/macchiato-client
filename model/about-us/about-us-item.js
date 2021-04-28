var mongoose = require('mongoose');
var imageSchema = require('../image/image');
var aboutUsItemSchema = mongoose.Schema({
    type:{type:mongoose.Schema.Types.String, required:true},    
    order:{type:mongoose.Schema.Types.Number, required:true},
    header:{type:mongoose.Schema.Types.String},
    text:{type:mongoose.Schema.Types.String},
    image:imageSchema
});

module.exports = aboutUsItemSchema;