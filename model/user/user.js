var mongoose = require('mongoose');
var userSchema = mongoose.Schema({

    userName : {type:String, required:true, unique:true},
    password : {type:String, required:true},
    name:{type:String,required:true},
    lastName:{type:String,required:true},
    studentNumberPrefix:{type:String,required:true},
    registerationDate:{type:Date,required:true},
    email:{type:String},
    gender:{type:String},
    cellphone:{type:String,required:true},
    province:{type:String,required:true},
    //TODO: SKILL SCORE
});