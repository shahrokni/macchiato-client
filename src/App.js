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
import { queries } from '@testing-library/react';
import {VocabQuestion} from './entity/question/vocab-question';
function App() {

  useEffect(() => {
    
    let service = new QuestionService();
    let question = new VocabQuestion();

    question.title = 'Fill the blank space with proper answers.3';
    question.hardness = HardnessLevel.Easy;
    question.type = QuestionType.Vocab;
    question.answerDuration = 50000;
    question.score2Asset = true;
    question.score = 100;
    question.usage.push(Usage.Level);    
    question.genre.push(Genre.General);
    question.hashtags.push('Egypt');   
    question.context = '...Pyramids in Egypet are known for their ... shape';
    let answer = new Answer();
    answer.answerType = AnswerType.Text;
    answer.correctAnswer = 'Mighty';
    question.answerItems.push(answer) ;


    console.log(question);
    service.addNewVocabSlangQuestion(question,(response)=>{
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
