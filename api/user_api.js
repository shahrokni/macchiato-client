/*--------------------------------------------------*/
var express = require('express');
const bodyParser = require('body-parser');
/*-------------------------------------------------*/
var api = express.Router();
api.use(bodyParser.json());
/*--------------------------------------------------*/
api.post('/user', (req,res)=>{
  
    let responseClass = require('../src/communication/entity/response');
 
    let response = new responseClass();
    
    let dateUtilModule = require('../src/util/date-util/date-util');
   
    let userValidationClass = require('../src/util/validation/user-validation'); 
    let userValidation = new userValidationClass(); 
    let errorMessages = userValidation.validateSignUpData(req.body);
   
    if(errorMessages!=null && errorMessages.length!=0){
 
       response.isSuccessful =false;
       response.operationTimestamp = dateUtilModule.getCurrentDateTime();
       response.setServerValidations(errorMessages);
       res.status(200).end(JSON.stringify(response));
       }

       res.end('Nothing!');
 });


 module.exports = api;