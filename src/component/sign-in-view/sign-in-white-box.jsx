import React from 'react';
import RememberMe from './remember-me';
import ForgotPassword from './forgot-password';
import SignUpLink from './sign-up-link';
import './css/sign-in-white-box.css';
import SimpleBtn from '../simple-btn/simple-btn';
import TextField from '@material-ui/core/TextField';

export default class SignInWhiteBox extends React.Component {

    render() {
        return (
            <div className="signInWhiteBoxContainer">
                <TextField id="signInUsernameTxt" label="Username" variant="outlined" />
                <TextField id="signInPasswordTxt" label="Password" type="password" variant="outlined" />
                <div className="signInOptions">
                    <RememberMe />
                    <ForgotPassword />
                </div>
                <SimpleBtn />
                <SignUpLink />
            </div>
        )
    }
}