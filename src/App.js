import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import UserService from './service/user-service/user-service';
import { UserDetail } from './entity/user/userDetail';
import { Province } from '../src/entity/global/province';

function App() {

  useEffect(() => {

    let user = new UserDetail();
    user.userName = "Test1";
    user.password = "ES6isthebest@!123";
    user.name  ="Mahmoud";
    user.lastName = "Shahrokni";
    user.province = Province.Khuzestan;

    
    let service = new UserService();    
    let reponse = service.signUp(user);
    document.write(reponse);
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
