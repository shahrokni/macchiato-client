var mongoose = require('mongoose');
var conStr = require('./src/setup-general-information').appGeneralInfo.connectionString;
module.exports = function () {
    mongoose.set('debug',true);
  mongoose.connection
    .on('error', () => { console.log('DB connection has thrown an exception!'); })
    .on('disconnected', () => { console.log('DB connection was disconnected!') })
    .on('open', () => { console.log('DB Connection was opened!'); });    
  
  mongoose.connect(conStr,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    
}

