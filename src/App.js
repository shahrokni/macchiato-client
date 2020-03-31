import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import UserService from './service/user-service/user-service';
import { UserDetail } from './entity/user/userDetail';
import { Province } from '../src/entity/global/province';
import { Gender } from './entity/user/gender';
import {UserFilter} from '../src/entity/user/user-filter';

function App() {

  useEffect(() => {

   let filter = new UserFilter();
   let service = new UserService();

  
   
    service.getUser(filter, function (response) {    
      
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
