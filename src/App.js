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
    user.name  ="Seyed Mahmoud";
    user.lastName = "Shahrokni";
    user.province = Province.Khuzestan;

    
    let service = new UserService();    
    service.signUp(user,function(response){

      let result = response.isSuccessful+"<br>";
      result = result+response.operationTimestamp+"<br>";
      result = result+"client errors: "+"<br>";

      for(let i=0;i<response.clientValidations.length;i++){
        result = result + i + "-" + response.clientValidations[i]+"<br>"
      }
      
      result =result +"server errors: "+ "<br>";
      for(let i=0;i<response.serverValidations.length;i++){
        result = result + i+ "-" + response.serverValidations[i]+"<br>"
      }
      document.write(result);
    });
    
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
