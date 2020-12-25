var Introducer = require('../../model/introducer/introducer');
let Contract = require('../../model/introducer/contract');
let ContactInfo = require('../../model/introducer/introducer-contact-info');
const mongoose = require('mongoose');
/*----------------------------------*/
async function addIntroducer(introducer) {
    return new Promise((resolve, reject) => {
        let response = new global.responseClass();
        response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
        const findQuery = Introducer.findOne({ code: introducer.code }, 'code');
        findQuery.exec()
            .then((document) => {
                if (document) {
                    response.isSuccessful = false;
                    response.serverValidations.push(global.errorResource.ErrBu0025());
                    resolve(response);
                }
                else {
                    const newIntroducer =
                        new Introducer({ code: introducer.code, name: introducer.name, isEnabled: introducer.isEnabled });
                    newIntroducer.save({})
                        .then((savedDocument) => {
                            response.isSuccessful = true;
                            const savedIntroducer = {
                                code: savedDocument.code,
                                name: savedDocument.name,
                                isEnabled: savedDocument.isEnabled
                            };
                            response.outputJson = savedIntroducer;
                            resolve(response);
                        })
                        .catch((err) => {
                            response.isSuccessful = false;
                            response.serverValidations.push(global.errorResource.Err0000());
                            resolve(response);
                        });
                }
            })
            .catch((err) => {
                response.isSuccessful = false;
                const errorMessage = global.dbExceptionHandler.tryGetErrorMessage(err);
                if (errorMessage)
                    response.serverValidations.push(errorMessage);
                else
                    response.serverValidations.push(global.errorResource.Err0000());
                resolve(response);
            })
    });
}
module.exports.addIntroducer = addIntroducer;

async function updateIntroducer(introducer) {
    return new Promise((resolve, reject) => {
        resolve(null);
    });
}
module.exports.updateIntroducer = updateIntroducer;

async function addContract(introducerCode, contract) {
    return new Promise((resolve, reject) => {
        resolve(null);
    });
}
module.exports.addContract = addContract;