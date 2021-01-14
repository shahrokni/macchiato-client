const aboutUsController = require('../../controller/v1/aboutus-controller');
const express = require('express');
const bodyParser = require('body-parser');
const aboutUsApi = express.Router();
aboutUsApi.use(bodyParser.json());
/*------------------------------------------------*/
aboutUsApi.get('/aboutus', (req, res) => {
    aboutUsController.getAboutUs(req.query.lang)
        .then((response) => {
            res.json({ response: response });
            return;
        });
});
module.exports = aboutUsApi;