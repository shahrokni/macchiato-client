var mongoose = require('mongoose');
/*--------------------------------*/
var administratorSchema = mongoose.Schema({

    name:{type:mongoose.Schema.Types.String, require:true},
    isEnable:{type:mongoose.Schema.Types.Boolean, require:true},
    clerkNumber : {type:mongoose.Schema.Types.String, require:true, unique: true }
});
var Administrator = mongoose.model('Administrator',administratorSchema);
module.exports.Administrator = Administrator;