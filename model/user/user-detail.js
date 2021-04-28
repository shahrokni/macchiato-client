var mongoose = require('mongoose');
var SkillScoreSchema = require('./skill-score');
/*---------------------------------*/
var userDetailSchema = mongoose.Schema({

    name: { type: mongoose.Schema.Types.String, required: true },
    lastName: { type: mongoose.Schema.Types.String, required: true },
    studentNumber: { type: mongoose.Schema.Types.String, required: true, unique: true },
    registerationDate: { type: mongoose.Schema.Types.Date, required: true },
    lastLoginDate: { type: mongoose.Schema.Types.Date },
    email: { type: mongoose.Schema.Types.String },
    gender: { type: mongoose.Schema.Types.String },
    cellphone: { type: mongoose.Schema.Types.String},
    province: { type: mongoose.Schema.Types.String, required: true },
    birthDate: { type: mongoose.Schema.Types.Date },
    isActive: { type: mongoose.Schema.Types.Boolean, required: true, default: true },
    skillScore: [SkillScoreSchema],
    introducer: { type: mongoose.Schema.Types.String, default: 'not-set' }
});
var UserDetail = mongoose.model('UserDetail', userDetailSchema);
module.exports.UserDetail = UserDetail;