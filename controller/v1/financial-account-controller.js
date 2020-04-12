var FinancialAccount = require('../../model/financial-account/financial-account');
/*--------------------------------------------------------------------------------*/
function getFinancialAccount(userId, columns,done){

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    let findQuery = FinancialAccount.findOne({userId:userId},columns);
    findQuery.exec((findErr,account)=>{

        if(!findErr){

            response.isSuccessful = true;
            response.outputJson = account;
            done(response);
        }
        else{
            
            response.isSuccessful = false;
            let message = global.dbExceptionHandler.tryGetErrorMessage(saveErr);

            if (message != null)
                response.serverValidations.push(message);
            else
                response.serverValidations.push(global.errorResource.Err0000());

            done(response);
        }
    });
}
module.exports.getFinancialAccount = getFinancialAccount;