import React from 'react';
import './css/register-view.css';
import WelcomeBox from '../welcome-box/welcome-box';
import RegisterBox from './register-box.jsx';

export default class RegisterView extends React.Component {
    render() {
        return (

            <div className='fullSize absolute'>
                <WelcomeBox text="Welcome to English Macchiato!" />
                <RegisterBox linkClick ={this.props.linkClick}/>
            </div>
        );
    }
}