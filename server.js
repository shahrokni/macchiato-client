var express = require('express');
const port = process.env.PORT || 5000;
/*-------------------------------------------------*/
var userApiRouter = require('./api/user_api');
const app = express();


app.use('/user_api',userApiRouter);

app.listen(port, () => console.log('Listening on port ' + port));
/*----------------------------------------------*/


