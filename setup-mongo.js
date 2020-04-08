var mongoose = require('mongoose');

module.exports = function () {

    mongoose.connection
        .on('error', () => { console.log('DB connection has thrown an exception!'); })
        .on('disconnected', () => {console.log('DB connection was disconnected!')})
        .on('open', () => { console.log('DB Connection was opened!'); });

    mongoose.connect('mongodb://localhost:27017/enmacchiatodb', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
}
