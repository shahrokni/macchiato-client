const mongoose = require('mongoose');
const messageItems = require('./global-message-item');
var globalMessageSchema = mongoose.Schema({
    transactionCode = { type: mongoose.Schema.Types.String, require: true },
    messageType: { type: mongoose.Schema.Types.String, require: true },
    header: { type: mongoose.Schema.Types.String, require: true },
    items: messageItems
});
const GlobalMessage = mongoose.model('GlobalMessage', globalMessageSchema);
module.exports = GlobalMessage;
