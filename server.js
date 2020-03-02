const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
/*-----------------------------------------------*/
const bodyParser = require('body-parser');
app.use(bodyParser.json());
/*----------------------------------------------*/



/*---------------------------------------------*/
app.listen(port, () => console.log('Listening on port ' + port));


app.post('/users',(req,res)=>{

    let testFunc = require('./src/util/validation/test');    

    let errorMessages = testFunc();    

    if(errorMessages !=null && errorMessages.length!==0){
        console.log('FUCK!');
    }
    else{
        console.log('OK!');
    }       
});