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



