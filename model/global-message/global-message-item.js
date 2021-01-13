const mongoose = require('mongoose');
const GlobalMessageItems = mongoose.Schema({
    header: { type: mongoose.Schema.Types.String, require: true },
    text: { type: mongoose.Schema.Types.String, require: true }
});
module.exports = GlobalMessageItems;