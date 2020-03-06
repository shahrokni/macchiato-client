const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
/*-----------------------------------------------*/
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.listen(port, () => console.log('Listening on port ' + port));
/*----------------------------------------------*/



app.post('/users',(req,res)=>{

   let resolvedFunction = require("./src/util/entity-object-resolver/entity-object-resolver");  
   let obj = resolvedFunction(); 
   console.log(obj);
});