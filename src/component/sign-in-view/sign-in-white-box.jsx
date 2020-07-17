import React from 'react';
import RememberMe from './remember-me';
import ForgotPassword from './forgot-password';
import SignUpLink from './sign-up-link';
import './css/sign-in-white-box.css';
import SimpleBtn from '../simple-btn/simple-btn';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from '../../resource/text/error-message';

export default class SignInWhiteBox extends React.Component {

    //If the user is already signed in
    //Do not show this page
    //Instead redirect to the homepage!
    constructor(props) {

        super(props);

        this.state = {
            validationState: {
                userNameValidation: {
                    isValid: true,
                    errorMessage: ErrorMessage.ErrBu0004()
                },
                passwordValidation: {
                    isValid: true,
                    errorMessage: ErrorMessage.ErrBu0006()
                }
            }
        }
    }

    render() {

        const signInBtnStyle = {
            size:'90%',
            marginTop: '10px',
            marginLeft: '5%',
            float:'left',
            textAlign:'center'
        }

        return (
            <div className="signInWhiteBoxContainer">

                <TextField
                error={this.state.validationState.userNameValidation.isValid}
                helperText={this.state.validationState.userNameValidation.errorMessage}
                id="signInUsernameTxtField" label="Username" variant="outlined" />

                <TextField
                error={this.state.validationState.passwordValidation.isValid}
                helperText={this.state.validationState.passwordValidation.errorMessage}
                id="signInPasswordTxtField" label="Password" type="password" variant="outlined" />

                <div className="signInOptions">
                    <RememberMe />
                    <ForgotPassword linkClick={this.props.linkClick}/>
                </div>

                <SimpleBtn text={'Sign in'} action={this.signInAction} secondryTheme={false} simpleStyle={signInBtnStyle} />
                <SignUpLink  linkClick={this.props.linkClick}/>
            </div>
        )
    }

    signInAction() {

    }

    validateUsernameTextField() {
      
    }

    validatePasswordTextField(){

    }
}