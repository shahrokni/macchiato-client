const mongoose = require('mongoose');
/*-----------------------------------*/
const contactInfoSchema = mongoose.Schema({
    tell:[mongoose.Schema.Types.String],
    address:[mongoose.Schema.Types.String],
    emailAddress:[mongoose.Schema.Types.String]
});
module.exports = contactInfoSchema