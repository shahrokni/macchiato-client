const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
/*-----------------------------------------------*/
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.listen(port, () => console.log('Listening on port ' + port));
/*----------------------------------------------*/


app.post('/users',(req,res)=>{
  
   let responseClass = require('./src/communication/entity/response');

   let response = new responseClass();
   let dateUtilModule = require('./src/util/date-util/date-util');
   response.operationTimestamp = dateUtilModule.getCurrentDateTime();

   let userValidationClass = require('./src/util/validation/user-validation');
   

   let userValidation = new userValidationClass();

   let errorMessages = userValidation.validateSignUpData(req.body);
   
   if(errorMessages!=null && errorMessages.length!=0){
      response.isSuccessful =false;
      response.setServerValidations(errorMessages);
      return response;
   }   

   

});