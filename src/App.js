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
   
    user.name  ="Elham";
    user.lastName = "Vaghefi";
    user.province = Province.Tehran;
    user.studentNumber = "202003281"
    user.cellphone = "09375681787";
    user.email = "m.shahrokny@gmail.com";
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
