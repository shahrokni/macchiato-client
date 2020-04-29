var financialAccount = require('../../model/financial-account/financial-account');
var mongoose = require('mongoose');
const staticAccountSettings = { initAmount: 3000, paymentType: ['Deposit', 'Withdraw'] };
/*------------------------------------------------------------------------------*/

function createFinancialAccount(userId, done) {

    findFinancialAccountByUserId(userId, (findErr, account) => {

        if (!findErr) {

            //Ever user have only one account
            if (!account) {

                let newAccount = new financialAccount();
                newAccount.userId = userId;
                newAccount.currentBalance = 0;
                newAccount.save((savErr, savedAccount) => {

                    if (!savErr) {

                        done(null, savedAccount);
                    }
                    else {

                        done(saveErr, null);
                    }
                });

            }
            else {

                done(global.errorResource.Err0004(), null);
            }
        }
        else {

            done(findErr, null);
        }

    });

}

function depositMoney(account, paymentItem, done) {

    if (account && account.userId && paymentItem) {

        findFinancialAccountByUserId(account.userId, (findErr, fetchedAccount) => {

            if (!findErr) {

                if (fetchedAccount) {

                    paymentItem.paymentType = staticAccountSettings.paymentType[0];
                    fetchedAccount.currentBalance += paymentItem.amount;
                    fetchedAccount.paymentItems.push(paymentItem);
                    fetchedAccount.save((saveErr, savedAccount) => {

                        if (!saveErr) {

                            done(null, savedAccount);
                        }
                        else {

                            done(saveErr, null);
                        }
                    });
                }
                else {

                    done(global.errorResource.Err0004(), null);
                }
            }
            else {

                done(findErr, null);
            }
        });
    }
    else {

        done(global.errorResource.Err0005(), null);
    }
}

function withdrawMoney(account, paymentItem, done) {

    if (account && account.userId && paymentItem) {

        findFinancialAccountByUserId(account.userId, (findErr, fetchedAccount) => {

            if (!findErr) {

                if (fetchedAccount) {

                    paymentItem.paymentType = staticAccountSettings.paymentType[1];
                    fetchedAccount.currentBalance -= paymentItem.amount;
                    fetchedAccount.paymentItems.push(paymentItem);
                    fetchedAccount.save((saveErr, savedAccount) => {

                        if (!saveErr) {

                            done(null, savedAccount);
                        }
                        else {

                            done(saveErr, null);
                        }
                    });
                }
                else {

                    done(global.errorResource.Err0004(), null);
                }
            }
            else {

                done(findErr, null);
            }
        });
    }
    else {

        done(global.errorResource.Err0005(), null);
    }
}

function findFinancialAccountByUserId(userId, done) {

    let findQuery = financialAccount.findOne({ userId: userId });

    findQuery.exec((findErr, account) => {

        done(findErr, account);
    });
}
/*---------------------EXPORTED FUNCTIONS---------------------------------------*/

//Create a financial account for a recent registered user
async function initiateUserFinancialAccount(userId, sessionOpt) {

    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();

    createFinancialAccount(userId, (creationErr, createdAccount) => {

        if (!creationErr) {

            if (createdAccount) {

                let paymentItemSchema = require('../../model/financial-account/payment-item');
                let PaymentItem = mongoose.model('PaymentItem', paymentItemSchema);
                let paymentItem = new PaymentItem();
                paymentItem.transactionDate = Date.now();
                paymentItem.amount = staticAccountSettings.initAmount;
                paymentItem.description = 'Initial asset!';
                paymentItem.isGift = true;

                depositMoney(createdAccount,paymentItem,(depositErr,depositedAccount)=>{

                    if(!depositErr){

                        response.isSuccessful = true;
                        response.outputJson = depositedAccount;
                        done(response);
                    }
                    else{

                        response.isSuccessful = false;
                        done(response);
                    }
                });
            }
            else {

                response.isSuccessful = false;
                done(response);
            }
        }
        else {

            response.isSuccessful = false;
            done(response);
        }
    });

  

}
module.exports.initiateUserFinancialAccount = initiateUserFinancialAccount;