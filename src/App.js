import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import UserService from './service/user-service/user-service';
import { UserDetail } from './entity/user/userDetail';
import { Gender } from './entity/user/gender';
import { Province } from '../src/entity/global/province';

function App() {

  useEffect(() => {

    let user = new UserDetail();
    user.name = 'Mahmoud';
    user.lastName = 'Shahrokni';
    user.gender = Gender.Male;
    user.email = 'm.shahrokny@gmail.com';
    user.userName = 'mim_delta1';
    user.password = 'C#8isthebest!';
    user.province = Province.Tehran;

    console.log(user);
    let service = new UserService();
    let result = service.signUp(user);
    document.write(result);
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
