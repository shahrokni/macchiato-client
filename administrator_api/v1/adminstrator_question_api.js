var questionController = require('../../administrator_controller/v1/administrator_question_controlller');
/*-------------------------------*/
const bodyParser = require('body-parser');
var express = require('express');
var adminQuestionApi = express.Router();
adminQuestionApi.use(bodyParser.json());
/*-------------------------------*/
adminQuestionApi.post('/question/reading', async (req,res)=>{

    await questionController.addNewReadingQuestion(req.body).then((response)=>{

        res.json({ response: response });
        return res;
    });   
});

adminQuestionApi.post('/question/listening', async (req,res)=>{

    await questionController.addNewListeningQuestion(req.body)
    .then((response)=>{

        res.json({ response: response });
        return res;
    });
    
});

adminQuestionApi.post('/question/writing', async (req,res)=>{

    await questionController.addNewWritingQuestion(req.body)
    .then((response)=>{

        res.json({ response: response });
        return res;
    });   
})

adminQuestionApi.post('/question/speaking', async (req,res)=>{

    await questionController.addNewSpeakingQuestion(req.body)
    .then((response)=>{

        res.json({ response: response });
        return res;
    });    
});

adminQuestionApi.post('/question/visual', async (req,res)=>{
    
    await questionController.addNewVisualQuestion(req.body)
    .then((response)=>{

        res.json({ response: response });
        return res;
    });    
})

adminQuestionApi.post('/question/vocab', async (req,res)=>{
   
    await questionController.addNewVocabQuestion(req.body)
    .then((response)=>{        
       
        res.json({ response: response });
        return res;
    });    
   
});

module.exports = adminQuestionApi;