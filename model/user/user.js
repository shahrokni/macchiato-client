var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");

var userSchema = mongoose.Schema({

    userName: { type: mongoose.Schema.Types.String, required: true, unique: true },
    password: { type: mongoose.Schema.Types.String, required: true },
    authkKey:{type: mongoose.Schema.Types.ObjectId, unique:true},
    userDetail: {type:mongoose.Schema.Types.ObjectId, ref:'UserDetail'},
    administrator : {type:mongoose.Schema.Types.ObjectId, ref:'Administrator'}
});

//Check password
userSchema.methods.checkPassword = function(guess,done){

    bcrypt.compare(guess,this.password,function(err,isMathc){

        done(err,isMathc);
    });
};

var User = mongoose.model('User', userSchema);
module.exports = User;