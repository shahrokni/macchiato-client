import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import UserService from './service/user-service/user-service';
import User  from './entity/user/user';
import { UserDetail } from './entity/user/userDetail';
import { Gender } from './entity/user/gender';

function App() {  

  useEffect(()=>{

    let user = new UserDetail();
    user.name = 'Mahmoud';
    user.lastName = 'Shahrokni';
    user.gender = Gender.Male;
    user.email = 'm.shahrokny@gmail.com';
    user.userName = 'mim_delta';
    user.password = 'C#8isthebest!';

    let service = new UserService();
    service.signUp(user);


  }
  );





  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
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
