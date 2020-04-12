var financialAccountController = require('../../controller/v1/financial-account-controller');
var express = require('express');
var requestHandler = require('../../server_util/request_handler/request-handler');
const bodyParser = require('bodyParser');
/*----------------------------------------------------------------------------------- */
var financialAccountApi = express.Router();
financialAccountApi.use(bodyParser.json());
/*---------------------------------------------------------------------------------- */


financialAccountApi.get('/financialAccount',requestHandler.isUserAuthenticated,(req,res)=>{

    let userId = req.user._id;
    let columns = 'currentBalance paymentItems';
    financialAccountController.getFinancialAccount(userId,columns,(response)=>{

        res.json({response:response});
        return;       
    });
});

financialAccountApi.get('/financialAccount/currentBalance',requestHandler.isUserAuthenticated,(req,res)=>{

    let userId = req.user._id;
    let columns = 'currentBalance';

    financialAccountController.getFinancialAccount(userId,columns,(response)=>{

        res.json({response:response});
        return;
    });
});

module.exports = financialAccountApi;