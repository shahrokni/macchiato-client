import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import UserService from './service/user-service/user-service';
import { UserDetail } from './entity/user/userDetail';
import { Province } from '../src/entity/global/province';
import { Gender } from './entity/user/gender';

function App() {

  useEffect(() => {

    let user = new UserDetail();
   
   
    user.studentNumber = "202003290";
    user.name  =" mahmoud";
    user.lastName = "shahrokny ";
    user.province = Province.Tehran;
    user.cellphone = "09126104851";
    user.gender = Gender.Male;
    let service = new UserService();
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
