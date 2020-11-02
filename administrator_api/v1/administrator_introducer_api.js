const adminIntroducerController = require('../../administrator_controller/v1/administrator_introducer_controller');
/*---------------------------*/
const bodyParser = require('body-parser');
const express = require('express');
const adminIntroducerApi = express.Router();
adminIntroducerApi.use(bodyParser.json());
/*--------------------------*/
adminIntroducerApi.post('/introducer', (req, res) => {
    adminIntroducerController.addIntroducer(req.body)
        .then((response) => {
            res.json({ response: response });
        });
});

adminIntroducerApi.put('/introducer', (req, res) => {
    adminIntroducerController.updateIntroducer(req.body)
        .then((response) => {
            res.json({ response: response });
        });
});

module.exports = adminIntroducerApi;