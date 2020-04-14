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
    
    let userDetail = new UserDetail();
    userDetail.name= 'Mahmoud';
    userDetail.lastName = 'Shahrokni';
    userDetail.userName = 'idiot123';
    userDetail.password = '123456';
    userDetail.province = Province.Khuzestan;
    let service = new UserService();
    service.signUp(userDetail,(response)=>{
      console.log(response);
    });
    // let service = new UserMessageService();
    // service.getAllMessages(0,(response)=>{
    //   console.log(response);
    // })

    // let service = new UserMessageService();
    // service.deleteMessage('5e8f8089685647114cbd1af7',(response)=>{
    //   console.log(response);
    // });

    // let service = new UserService();
    // let user = new User();
    // user.userName = 'test1';
    // user.password = 'C#8isthebest@!123';
    // service.signIn(user, function (response) {    
      
    //   console.log(response);
    // });

  //  let service = new UserMessageService();
  //  service.setReadFlag('5e8f8089685647114cbd1af7',(response)=>{

  //   console.log(response);
  //  });

  // let service = new UserMessageService();
  // service.countUnreadMessages((response)=>{
  //   console.log(response);
  // });

  // let service = new UserMessageService();
  // let userMessage = new UserMessage();
  // userMessage.receiverId = '5e80ba37b582861d888fa276';
  // userMessage.title = 'Second Sample';
  // userMessage.text = 'This is the second sample message';
  // userMessage.sentDate = Date.now();
  // userMessage.senderId = 'XXX';
  // service.addMessageTEST(userMessage,(response)=>{
  //   console.log(response);
  // });
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
