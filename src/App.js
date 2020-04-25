import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import UserService from './service/user-service/user-service';
import { UserDetail } from './entity/user/userDetail';
import User from './entity/user/user';
import { Province } from '../src/entity/global/province';
import { Gender } from './entity/user/gender';
import {UserFilter} from '../src/entity/user/user-filter';
import UserMessageService from '../src/service/user-message-service/user-message-service';
import UserMessage from '../src/entity/user-message/user-message';
import QuestionService from './service/question-service/question-service';
import ReadingQuestion from './entity/question/reading-question';
import { HardnessLevel } from './entity/question/hardness-level';
import { QuestionType } from './entity/question/question-type';
import { Usage } from './entity/question/usage';
import { Genre } from './entity/question/genre';
import Answer from './entity/answer/answer';
import { AnswerType } from './entity/answer/answer-type';
import {ListeningQuestion} from './entity/question/listening-question';
import {WritingQuestion} from './entity/question/writing-question';
import {VisualQuestion} from './entity/question/visual-question';
import {SpeakingQuestion} from './entity/question/speaking-question';
function App() {

  useEffect(() => {
    
    let service = new QuestionService();
    let question = new SpeakingQuestion();

    question.title = 'Take a look at and describe the folllowing';
    question.hardness = HardnessLevel.Moderate;
    question.type = QuestionType.Speaking;
    question.answerDuration = 600000;
    question.score2Asset = false;
    question.score = 0;
    question.usage.push(Usage.Mock);    
    question.genre.push(Genre.General);
    question.hashtags.push('Plato');
    question.questionItems.push('What is a plato?');   
    question.cost=40000;
    question.context = 'The following picture shows a plato ...';
    question.answerType = AnswerType.Voice;
    console.log(question);
    service.addNewS(question,(response)=>{
      console.log(response);
    });


  });


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p id='myP'>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
