var mongoose = require('mongoose');
var SkillScoreSchema = require('./skill-score');
var bcrypt = require("bcrypt-nodejs");

var userSchema = mongoose.Schema({

    userName: { type: mongoose.Schema.Types.String, required: true, unique: true },
    password: { type: mongoose.Schema.Types.String, required: true },
    name: { type: mongoose.Schema.Types.String, required: true },
    lastName: { type: mongoose.Schema.Types.String, required: true },
    studentNumber: { type: mongoose.Schema.Types.String, required: true, unique:true },
    registerationDate: { type: mongoose.Schema.Types.Date, required: true },
    email: { type: mongoose.Schema.Types.String },
    gender: { type: mongoose.Schema.Types.String },
    cellphone: { type: mongoose.Schema.Types.String },
    province: { type: mongoose.Schema.Types.String, required: true },
    birthDate: { type: mongoose.Schema.Types.Date },
    isActive : {type: mongoose.Schema.Types.Boolean, required:true, default:true},
    skillScore: [SkillScoreSchema]
});

//Check password
userSchema.methods.checkPassword = function(guess,done){

    bcrypt.compare(guess,this.password,function(err,isMathc){

        done(err,isMathc);
    });
};

var User = mongoose.model('User', userSchema);
module.exports = User;