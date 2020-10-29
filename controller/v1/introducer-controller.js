const Introducer = require('../../model/introducer/introducer');
const mongoose = require('mongoose');
/*--------------------------------------------------------------*/

async function getAllIntroducers(){
    return new Promise((resolve,reject)=>{
        resolve(null);
    });
}

module.exports.getAllIntroducers = getAllIntroducers;

async function getAllIntroducersDetail(){
    return new Promise((resolve,reject)=>{
        resolve(null);
    });
}
module.exports.getAllIntroducersDetail = getAllIntroducersDetail;

async function addIntroducer(introducer){
    return new Promise((resolve,reject)=>{
        resolve(null);
    });
}
module.exports.addIntroducer = addIntroducer;

async function updateIntroducer(introducer){
    return new Promise((resolve,reject)=>{
        resolve(null);
    });
}
module.exports.updateIntroducer = updateIntroducer;

async function addContract(introducerCode,contract){
    return new Promise((resolve,reject)=>{
        resolve(null);
    });
}
module.exports.addContract = addContract;

