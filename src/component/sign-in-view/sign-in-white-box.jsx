import React from 'react';
import RememberMe from './remember-me';
import ForgotPassword from './forgot-password';
import SignUpLink from './sign-up-link';
import './css/sign-in-white-box.css';
import SimpleBtn from '../simple-btn/simple-btn';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from '../../resource/text/error-message';
import { checkUserName, checkStrongPassword } from '../../util/regex/string-regex';

export default class SignInWhiteBox extends React.Component {

    //If the user is already signed in
    //Do not show this page
    //Instead redirect to the homepage!
    constructor(props) {

        super(props);
        this.parentViewModel = props.signinViewModel;    

        this.state = {
        isUsernameValid:false, 
        isPasswordValid:false,
        usernameErrorMessage:undefined,
        passwordErrorMessage:undefined}
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
                onChange={(e)=>{
                   this.trackUsernameChange(this,e);
                }}        
                error={!this.state.isUsernameValid}
                helperText={this.state.usernameErrorMessage}                
                id="signInUsernameTxtField" label="Username" variant="outlined" />

                <TextField
                onChange={(e)=>{
                    this.trackPasswordChange(this,e)
                }}
                error={!this.state.isPasswordValid}
                helperText={this.state.passwordErrorMessage}
                id="signInPasswordTxtField" label="Password" type="password" variant="outlined" />

                <div className="signInOptions">
                    <RememberMe />
                    <ForgotPassword linkClick={this.props.linkClick}/>
                </div>

                <SimpleBtn text={'Sign in'} action={this.props.signinAction} secondryTheme={false} simpleStyle={signInBtnStyle} />
                <SignUpLink  linkClick={this.props.linkClick}/>
            </div>
        )
    }
    
    trackUsernameChange(invoker,e){
        
        invoker.parentViewModel.username = e.target.value;
        let isValid = checkUserName(invoker.parentViewModel.username);

        (isValid===false) ? invoker.enableUsernameWarning(invoker,true):invoker. enableUsernameWarning(invoker,false);
    }

    trackPasswordChange(invoker,e){

        invoker.parentViewModel.password = e.target.value;
        let isValid = checkStrongPassword(invoker.parentViewModel.password);
        (isValid===false)? invoker.enablePasswordWarning(invoker,true):invoker.enablePasswordWarning(invoker,false);
    }

    enableUsernameWarning(invoker,isEnabled){
        
        (isEnabled===true)?invoker.setState({isUsernameValid:false,usernameErrorMessage:ErrorMessage.ErrBu0004()}):
        invoker.setState({isUsernameValid:true,usernameErrorMessage:""});
    }    

    enablePasswordWarning(invoker,isEnabled){
        (isEnabled===true)?invoker.setState({isPasswordValid:false,passwordErrorMessage:ErrorMessage.ErrBu0006()}):
        invoker.setState({isPasswordValid:true,passwordErrorMessage:""});
    }
}