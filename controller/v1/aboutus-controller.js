const AboutUs = require('../../model/about-us/about-us');

function getAboutUs(language) {
    return new Promise((resolve, reject) => {
        let response = new global.responseClass();
        response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
        const findQuery = AboutUs.findOne({ language:language });
        findQuery.exec((err, result) => {
            if (err) {                
                response.isSuccessful = false;
                response.serverValidations.push(global.errorResource.Err0000());
                resolve(response);
            }
            else {
                response.isSuccessful = true;
                response.outputJson = result;                
                resolve(response);
            }
        })
    })
}
module.exports.getAboutUs = getAboutUs;