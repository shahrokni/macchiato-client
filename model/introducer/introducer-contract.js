const mongoose = require('mongoose');
const contractSchema = require('./contract');
/*----------------------------------*/
const introducerContract = mongoose.Schema({
 contrcts:[contractSchema]
});
module.exports = introducerContract;