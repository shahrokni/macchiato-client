var mongoose = require('mongoose');
var SkillScoreSchema = require('./skill-score');

var userSchema = mongoose.Schema({

    userName: { type: mongoose.Schema.Types.String, required: true, unique: true },
    password: { type: mongoose.Schema.Types.String, required: true },
    name: { type: mongoose.Schema.Types.String, required: true },
    lastName: { type: mongoose.Schema.Types.String, required: true },
    studentNumberPrefix: { type: mongoose.Schema.Types.String, required: true },
    registerationDate: { type: mongoose.Schema.Types.Date, required: true },
    email: { type: mongoose.Schema.Types.String, },
    gender: { type: mongoose.Schema.Types.String },
    cellphone: { type: mongoose.Schema.Types.String},
    province: { type: mongoose.Schema.Types.String, required: true },
    birthDate:{type:mongoose.Schema.Types.Date},
    skillScore: [SkillScoreSchema]
});

var User = mongoose.model('User', userSchema);
module.exports = User;