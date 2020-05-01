var FinancialAccount = require('../../model/financial-account/financial-account');
var mongoose = require('mongoose');
const staticAccountSettings = { initAmount: 3000, paymentType: ['Deposit', 'Withdraw'] };
/*------------------------------------------------------------------------------*/

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


/*---------------------EXPORTED FUNCTIONS---------------------------------------*/

//Create a financial account for a recent registered user
async function initiateUserFinancialAccount(userId, sessionOption) {
    
    let response = new global.responseClass();
    response.operationTimestamp = global.dateUtilModule.getCurrentDateTime();
    let financialAccount = undefined;

    let newAccount = new FinancialAccount();
    newAccount.userId = userId;
    newAccount.currentBalance = 0;

    let accountId;
    await newAccount.save(sessionOption)
    .then((createdAccount)=>{

        accountId = createdAccount._id;
    })
    .catch((exception)=>{
      
        let message = global.dbExceptionHandler.tryGetErrorMessage(exception);
        if (message != null)
            throw message;
        else
            throw global.errorResource.Err0000();
    });

    let paymentItemSchema = require('../../model/financial-account/payment-item');
    let PaymentItem = mongoose.model('PaymentItem', paymentItemSchema);
    let paymentItem = new PaymentItem();
    paymentItem.transactionDate = Date.now();
    paymentItem.amount = staticAccountSettings.initAmount;
    paymentItem.description = 'Initial asset!';
    paymentItem.isGift = true;
    paymentItem.paymentType = staticAccountSettings.paymentType[0];
    
    let findAccountQuesry = FinancialAccount.findById(accountId,null,sessionOption);
    await findAccountQuesry.exec()
    .then(async (fetchedAccount)=>{

        fetchedAccount.currentBalance += paymentItem.amount;
        fetchedAccount.paymentItems.push(paymentItem);
        await fetchedAccount.save(sessionOption).then((updatedAccount)=>{

            financialAccount = updatedAccount;
        })
        .catch((exception)=>{
           
            throw exception;
        })
    })
    .catch((exception)=>{
       
        throw global.errorResource.Err0000();
    });
}
module.exports.initiateUserFinancialAccount = initiateUserFinancialAccount;