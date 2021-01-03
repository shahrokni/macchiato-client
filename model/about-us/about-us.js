var mongoose = require('mongoose');
var aboutUsItemSchema = require('./about-us-item');
var aboutUsSchema = mongoose.Schema({
    language: { type: mongoose.Schema.Types.String, required: true },
    aboutUsItems: [aboutUsItemSchema]
});
const AboutUs = mongoose.model('AboutUs', aboutUsSchema);
module.exports = AboutUs;