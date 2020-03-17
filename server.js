var express = require('express');
const port = process.env.PORT || 5000;
/*-------------------------------------------------*/
var userApiRouter = require('./api/v1/user_api');
const app = express();


app.use('/user_api/v1',userApiRouter);

app.listen(port, () => console.log('Listening on port ' + port));
/*----------------------------------------------*/


