import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import UserService from './service/user-service/user-service';
import { UserDetail } from './entity/user/userDetail';
import User from './entity/user/user';
import { Province } from '../src/entity/global/province';
import { Gender } from './entity/user/gender';
import {UserFilter} from '../src/entity/user/user-filter';

function App() {

  useEffect(() => {
    let user = new UserDetail();
    let service = new UserService();

    user.name = 'Mahmoud';
    user.lastName = 'Shahrokni';
    user.province = Province.Khuzestan;
    user.cellphone = '09126104851'
    user.gender = Gender.Male;
    service.update(user, function (response) {    
      
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
