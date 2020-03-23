var express = require('express');
var mongoose = require('mongoose');
const port = process.env.PORT || 5000;
/*-------------------------------------------------*/
mongoose.connect('mongodb://localhost:27017/enmacchiatodb',{useNewUrlParser:true,useUnifiedTopology:true});
/*------------------------------------------------*/
var userApiRouter = require('./api/v1/user_api');
const app = express();


app.use('/user_api/v1',userApiRouter);

app.listen(port, () => console.log('Listening on port ' + port));
/*----------------------------------------------*/


