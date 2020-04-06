var mongoose = require('mongoose');

function connect() {

    mongoose.connection
        .on('error', () => { console.log('DB connection has thrown an exception!'); })
        .on('disconnected', () => {connect();})
        .on('open', () => { console.log('DB Connection was opened!'); });

    mongoose.connect('mongodb://localhost:27017/enmacchiatodb', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
}

module.exports.connect = connect;

function close() {

    mongoose.connection.close();
}

module.exports.close = close;