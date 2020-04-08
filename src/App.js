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

function App() {

  useEffect(() => {
   
    let userMessageService = new UserMessageService();
    let userMessage = new UserMessage();
    userMessage.senderId = '202003290';
    userMessage.receiverId = '5e89e72915823b25507e1f21';
    userMessage.sentDate = Date.now();
    userMessage.title = 'We are going to extend our application';
    userMessage.text = "From January 1st we will be extending our application ";

    userMessageService.addMessageTEST(userMessage,function(response){
      console.log(response);
    })
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
