import React from 'react';
import './css/sign-in-view.css';
import SigInLogo from './sign-in-logo';
import SignInWhiteBox from './sign-in-white-box';
import WelcomeBox from '../welcome-box/welcome-box';

export default class SignInView extends React.Component {

    constructor(props) {

        super(props);

        this.signinViewModel = {
            username: undefined,
            password: undefined
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <WelcomeBox text="Welcome to English Macchiato" />
                <div className="signInViewContainer">

                    <SigInLogo />
                    <SignInWhiteBox
                        signinViewModel = {this.signinViewModel}
                        signinAction={this.signin}
                        linkClick={this.props.linkClick} />
                </div>
            </React.Fragment>
        )
    }

    signin() {

    }

    validateSigninViewModel(){

    }
}