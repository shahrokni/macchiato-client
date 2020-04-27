var questionController = require('../../administrator_controller/v1/administrator_question_controlller');
/*-------------------------------*/
const bodyParser = require('body-parser');
var express = require('express');
var adminQuestionApi = express.Router();
adminQuestionApi.use(bodyParser.json());
/*-------------------------------*/
adminQuestionApi.post('/question/reading', async (req,res)=>{

    questionController.addNewReadingQuestion(req.body).then((response)=>{

        res.json({ response: response });
        return res;
    });   
});

adminQuestionApi.post('/question/listening', async (req,res)=>{

    questionController.addNewListeningQuestion(req.body)
    .then((response)=>{

        res.json({ response: response });
        return res;
    });
    
});

adminQuestionApi.post('/question/writing', async (req,res)=>{

    questionController.addNewWritingQuestion(req.body)
    .then((response)=>{

        res.json({ response: response });
        return res;
    });   
})

adminQuestionApi.post('/question/speaking', async (req,res)=>{

    questionController.addNewSpeakingQuestion(req.body)
    .then((response)=>{

        res.json({ response: response });
        return res;
    });    
});

adminQuestionApi.post('/question/visual', async (req,res)=>{
    
    questionController.addNewVisualQuestion(req.body)
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