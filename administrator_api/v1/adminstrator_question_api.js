var questionController = require('../../administrator_controller/v1/administrator_question_controlller');
/*-------------------------------*/
const bodyParser = require('body-parser');
var express = require('express');
var adminQuestionApi = express.Router();
adminQuestionApi.use(bodyParser.json());
/*-------------------------------*/
adminQuestionApi.post('/question/reading',(req,res)=>{

    questionController.addNewReadingQuestion(req.body).then(()=>{

    })
    .catch((reason)=>{

    });
});

adminQuestionApi.post('/question/listening',(req,res)=>{

    questionController.addNewListeningQuestion(req.body)
    .then(()=>{})
    .catch((reason)=>{

    });
});

adminQuestionApi.post('/question/writing',(req,res)=>{

    questionController.addNewWritingQuestion(req.body)
    .then(()=>{

    })
    .catch((reason)=>{

    });
})

adminQuestionApi.post('/question/speaking',(req,res)=>{

    questionController.addNewSpeakingQuestion(req.body)
    .then(()=>{

    })
    .catch((reason)=>{

    });
});

adminQuestionApi.post('/question/visual',(req,res)=>{
    
    questionController.addNewVisualQuestion(req.body)
    .then(()=>{

    })
    .catch((reason)=>{

    });
})

adminQuestionApi.post('/question/vocab',(req,res)=>{

    questionController.addNewVocabQuestion(req.body)
    .then(()=>{

    })
    .catch((reason)=>{

    });
});

module.exports = adminQuestionApi;