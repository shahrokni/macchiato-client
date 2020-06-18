import React from 'react';
import './css/register-view.css';
import WelcomeBox from '../welcome-box/welcome-box';
import LogoBox from '../logo-box/logo-box';
export default class RegisterView extends React.Component{

      
    render(){
        return (

            <div className='fullSize absolute'>            
            <WelcomeBox text="Welcome to English Macchiato!"/>
            <h1>Register View</h1>
            <LogoBox />
            </div>
        );     
    }
}