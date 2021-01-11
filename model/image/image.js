var mongoose = require('mongoose');
var imageSchema = mongoose.Schema({    
    type:{type:mongoose.Schema.Types.String, required:true},
    alt:{type:mongoose.Schema.Types.String, required:true},
    name:{type:mongoose.Schema.Types.String, required:true},
    hasMobileTabletPortrait:{type:mongoose.Schema.Types.Boolean},
    hasMobileTabletLandscape:{type:mongoose.Schema.Types.Boolean},
    hasIPadFamily:{type:mongoose.Schema.Types.Boolean},
    hasDesktop:{type:mongoose.Schema.Types.Boolean}
});
module.exports = imageSchema