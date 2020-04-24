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
function App() {

  useEffect(() => {
    
    let service = new QuestionService();
    let question = new ListeningQuestion();

    question.title = 'Listen to the audio file and answer the following questions accordingly';
    question.hardness = HardnessLevel.Moderate;
    question.type = QuestionType.Listening;
    question.answerDuration = 15000;
    question.score2Asset = false;
    question.score = 200;
    question.usage.push(Usage.Mock);
    question.usage.push(Usage.Level);
    question.genre.push(Genre.General);
    question.hashtags.push('Car');
    question.questionItems.push('How can we dismantle a car engine?');   

    let answer = new Answer();
    answer.answerType = AnswerType.Text;
    answer.correctAnswer = 'with a wrench';
    console.log(answer);
    let answer2 = new Answer();
    answer2.answerType = AnswerType.MultipleChoice;
    answer2.multipleChoice.push('Wrench');
    answer2.multipleChoice.push('Saw');
    answer2.multipleChoice.push('Hammer');
    answer2.multipleChoice.push('Bolt');
    answer2.correctAnswer = 'Wrench';

    question.answerItems.push(answer);
    question.answerItems.push(answer2);
    console.log(question);
    service.addNewListeningQuestion(question,(response)=>{
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
