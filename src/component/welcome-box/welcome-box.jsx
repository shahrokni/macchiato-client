import React from 'react';
import './css/welcome-box.css';

export default class WelcomeBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { welcomeMessage: '', isWelcomeBoxHidden: ' hidden' }
    }

    componentDidMount() {

        const defaultWelcomeMessage = 'Welcome to English Macchiato!';
        const name = window.localStorage.getItem('userName');   
        const lastName = window.localStorage.getItem('userLastName');

             
        if (name && lastName)
            this.setState({
                welcomeMessage: `Welcome ${name} ${lastName}!`,
                isWelcomeBoxHidden: ''
            });
        else
            this.setState({welcomeMessage:defaultWelcomeMessage,isWelcomeBoxHidden:''});
    }

    render() {


        return (

            <div className={'welcomeBox' + this.state.isWelcomeBoxHidden}>
                {this.state.welcomeMessage}
            </div>
        )
    }


}