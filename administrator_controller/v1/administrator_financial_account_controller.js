var financialAccount = require('../../model/financial-account/financial-account');
var mongoose = require('mongoose');
const staticAccountSettings = {initAmount:3000};
/*------------------------------------------------------------------------------*/
function findFinancialAccountByUserId(userId,done){

    let findQuery = financialAccount.findOne({userId:userId});

    findQuery.exec((findErr,account)=>{

        done(findErr,account);
    });    
}
/*---------------------EXPORTED FUNCTIONS---------------------------------------*/

//Create a financial account for a recent registered user
function initiateUserFinancialAccount(userId,done){

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    findFinancialAccountByUserId(userId,(findErr,account)=>{

        if(!findErr){

            if(!account){

                let newAccount = new financialAccount();
                newAccount.userId = userId;
                newAccount.initAmount = staticAccountSettings.initAmount;

                let paymentItemSchema = require('../../model/financial-account/payment-item');
                let PaymentItem = mongoose.model('PaymentItem',paymentItemSchema);
                let paymentItem= new PaymentItem();
                paymentItem.transactionDate = Date.now();
                paymentItem.amount = staticAccountSettings.initAmount;
                paymentItem.description = 'Initial asset!';
                paymentItem.isGift = true;
                newAccount.paymentItems.push(paymentItem);
                
                newAccount.save((saveErr,account)=>{

                    if(!saveErr){

                        if(account){

                            response.isSuccessful = true;                            
                            done(account);
                        }
                        else{

                            response.isSuccessful = false;
                            done(response);
                        }
                    }
                    else{

                        response.isSuccessful = false;
                        done(response)
                    }                    
                });
            }
            else{

                response.isSuccessful = false;
                done(response);
            }
        }
        else{

            response.isSuccessful = false;
            done(response);
        }
    });
}
module.exports.initiateUserFinancialAccount = initiateUserFinancialAccount;