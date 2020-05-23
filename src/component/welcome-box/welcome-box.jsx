import React from 'react';
import './css/welcome-box.css'
export default class WelcomeBox extends React.Component{

    render(){
        return (
            <div className="welcomeBox">
                {this.props.text}
            </div>
        )
    }
}