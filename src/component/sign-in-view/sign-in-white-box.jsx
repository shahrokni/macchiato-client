import React from 'react';
import RememberMe from './remember-me';
import ForgotPassword from './forgot-password';
import SignUpLink from './sign-up-link';
import SigninMessage from './sign-in-message';
import './css/sign-in-white-box.css';
import SimpleBtn from '../simple-btn/simple-btn';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from '../../resource/text/error-message';
import { checkUserName, checkStrongPassword } from '../../util/regex/string-regex';

export const SignInWhiteBox = React.forwardRef((props, ref) => (

    <SigninWhiteBoxClass
        buttonRef={ref.btnRef}
        messageRef={ref.messageRef}
        signinViewModel={props.signinViewModel}
        linkClick={props.linkClick}
        signinAction={props.signinAction}
        siginmessage={props.siginmessage}
    />
));

class SigninWhiteBoxClass extends React.Component {

    constructor(props) {

        super(props);
        this.parentViewModel = props.signinViewModel;

        this.state = {
            isUsernameValid: false,
            isPasswordValid: false,
            usernameErrorMessage: undefined,
            passwordErrorMessage: undefined
        }
    }

    render() {

        const signInBtnStyle = {
            size: '90%',
            marginTop: '10px',
            marginLeft: '5%',
            float: 'left',
            textAlign: 'center',
            height:'8%'
        }       


        if(!window.matchMedia('(max-width:767px)'))
            delete signInBtnStyle.height;

        return (
            <div className="signInWhiteBoxContainer">

                {/* USER NAME */}
                <TextField

                    onKeyPress={(e) => {
                        this.callSigninAction(e);
                    }}

                    onChange={(e) => {
                        this.trackUsernameChange(this, e);
                    }}
                    error={!this.state.isUsernameValid}
                    helperText={this.state.usernameErrorMessage}
                    id="signInUsernameTxtField" label="Username" variant="outlined" />

                {/* PASSWORD */}
                <TextField

                    onKeyPress={(e) => {
                        this.callSigninAction(e);
                    }}

                    onChange={(e) => {
                        this.trackPasswordChange(this, e)
                    }}
                    error={!this.state.isPasswordValid}
                    helperText={this.state.passwordErrorMessage}
                    id="signInPasswordTxtField" label="Password" type="password" variant="outlined" />

                {/* REMEMBER ME */}
                <div className="signInOptions">
                    <RememberMe signinViewModel={this.props.signinViewModel} />
                    <ForgotPassword linkClick={this.props.linkClick} />
                </div>

                <SigninMessage messageRef={this.props.messageRef} />
                {/* SIGN IN BUTTON */}
                <SimpleBtn buttonRef={this.props.buttonRef} text={'Sign in'} action={this.props.signinAction} secondryTheme={false} simpleStyle={signInBtnStyle} />
                <SignUpLink linkClick={this.props.linkClick} />
            </div>
        )
    }

    callSigninAction(event) {

        event.key === 'Enter' &&
            this.props.signinAction();
    }

    trackUsernameChange(invoker, e) {

        invoker.parentViewModel.username = e.target.value;
        let isValid = checkUserName(invoker.parentViewModel.username);

        (isValid === false) ? invoker.enableUsernameWarning(invoker, true) : invoker.enableUsernameWarning(invoker, false);
    }

    trackPasswordChange(invoker, e) {

        invoker.parentViewModel.password = e.target.value;
        let isValid = checkStrongPassword(invoker.parentViewModel.password);
        (isValid === false) ? invoker.enablePasswordWarning(invoker, true) : invoker.enablePasswordWarning(invoker, false);
    }

    enableUsernameWarning(invoker, isEnabled) {

        (isEnabled === true) ? invoker.setState({ isUsernameValid: false, usernameErrorMessage: ErrorMessage.ErrBu0004() }) :
            invoker.setState({ isUsernameValid: true, usernameErrorMessage: "" });
    }

    enablePasswordWarning(invoker, isEnabled) {
        (isEnabled === true) ? invoker.setState({ isPasswordValid: false, passwordErrorMessage: ErrorMessage.ErrBu0006() }) :
            invoker.setState({ isPasswordValid: true, passwordErrorMessage: "" });
    }
}