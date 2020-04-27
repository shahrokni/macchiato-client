var mongoose = require('mongoose');
var SkillScoreSchema = require('./skill-score');
var bcrypt = require("bcrypt-nodejs");

var userSchema = mongoose.Schema({

    userName: { type: mongoose.Schema.Types.String, required: true, unique: true },
    password: { type: mongoose.Schema.Types.String, required: true },
    userDetail: {type:mongoose.Schema.Types.ObjectId, ref:'userdetails'},
    administrator : {type:mongoose.Schema.Types.ObjectId, ref:'administrators'}
});

//Check password
userSchema.methods.checkPassword = function(guess,done){

    bcrypt.compare(guess,this.password,function(err,isMathc){

        done(err,isMathc);
    });
};

var User = mongoose.model('User', userSchema);
module.exports = User;