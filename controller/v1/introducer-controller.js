const Introducer = require('../../model/introducer/introducer');
const projecttion = 'name code isEnabled';
const detailedProjection = 'name code isEnabled contactInfo contract';
/*--------------------------------------------------------------*/

async function getAllIntroducers(includeDetail) {
    return new Promise((resolve, reject) => {
        let response = new global.responseClass();
        response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
        const findQuery = Introducer.find({ isEnabled: true },
            ((includeDetail === false) ? projecttion : detailedProjection));        
        findQuery.exec((err, documents) => {
            if (err) {
                response.isSuccessful = false;
                response.serverValidations.push(global.errorResource.Err0000());
                resolve(response);
            }
            else {
                response.isSuccessful = true;
                response.outputJson = documents;
                resolve(response);
            }
        });
    });
}
module.exports.getAllIntroducers = getAllIntroducers;