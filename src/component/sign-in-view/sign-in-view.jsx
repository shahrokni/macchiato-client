import React from 'react';
import './css/sign-in-view.css';
import SigInLogo from './sign-in-logo';
import { SignInWhiteBox } from './sign-in-white-box';
import WelcomeBox from '../welcome-box/welcome-box';
import UserService from '../../service/user-service/user-service';
import { AuthenticationState } from '../../entity/global/authentication-state';
import User from '../../entity/user/user';
import { appGeneralInfo } from '../../setup-general-information';
import { setCookie, getCookieByKey } from '../../util/cookie-util/cookie-util';
import { commonMessages } from '../../resource/text/common-messages';

export default class SignInView extends React.Component {

    constructor(props) {

        super(props);

        this.state = { isAuthenticated: AuthenticationState.NotSet };
        this.signinButtonRef = React.createRef();
        this.signinMessageRef = React.createRef();

        this.signinViewModel = {
            username: undefined,
            password: undefined,
            rememberMe: undefined
        }

        this.isSigninDisable = false;
    }

    componentDidMount() {

        let userService = new UserService();
        userService.isUserAuthenticated((serverResponse) => {

            let responseUtil = require('../../util/response-util/response-util');

            if (responseUtil.isAuthenticated(serverResponse) === AuthenticationState.Authenticated) {

                this.setState({ isAuthenticated: AuthenticationState.Authenticated });
            }
            else if (responseUtil.isAuthenticated(serverResponse) === AuthenticationState.NotAuthenticated) {

                this.setState({ isAuthenticated: AuthenticationState.NotAuthenticated });
            }
            else if (responseUtil.isAuthenticated(serverResponse) === AuthenticationState.CommunicationError) {

                this.setState({ isAuthenticated: AuthenticationState.CommunicationError });
            }
        });
    }

    render() {

        let isUserAuthenticated = this.state.isAuthenticated;

        const siginWhiteBoxProps = {
            signinViewModel: this.signinViewModel,
            signinAction: () => { this.signin(this) },
            linkClick: this.props.linkClick
        }

        return (
            <React.Fragment>

                {isUserAuthenticated === AuthenticationState.NotAuthenticated &&

                    (
                        (getCookieByKey('authKey') === '') ? (
                            <React.Fragment>
                                {
                                    !window.matchMedia("(max-width:767px)") &&
                                    <WelcomeBox />
                                }
                                <div className="signInViewContainer">
                                    <SigInLogo />
                                    <SignInWhiteBox
                                        ref={{ btnRef: this.signinButtonRef, messageRef: this.signinMessageRef }}
                                        {...siginWhiteBoxProps}
                                    />
                                </div>
                            </React.Fragment>)
                            : (
                                <React.Suspense fallback={<h3>{commonMessages.loading}</h3>}>
                                    <div style={{ visibility: 'hidden' }}>
                                        {
                                            (window.location.href=appGeneralInfo.baseUrl+
                                                appGeneralInfo.views.checkUserInformation)
                                        }
                                    </div>
                                </React.Suspense>
                            )
                    )
                }
                {isUserAuthenticated === AuthenticationState.Authenticated &&
                    <React.Suspense fallback={<h3>{commonMessages.loading}</h3>}>
                        <div style={{ visibility: 'hidden' }}>
                            {
                                (window.location.href = appGeneralInfo.baseUrl +
                                    appGeneralInfo.mainMenuItems.homePage)
                            }
                        </div>
                    </React.Suspense>
                }
                {isUserAuthenticated === AuthenticationState.CommunicationError &&
                    <React.Suspense fallback={<h3>{commonMessages.loading}</h3>}>
                        {
                            /*Redirect to Global View Message*/
                            <div style={{ visibility: 'hidden' }}>
                                {
                                    window.location.href = appGeneralInfo.baseUrl +
                                    appGeneralInfo.views.globalMessage
                                }
                            </div>
                        }
                    </React.Suspense>
                }
            </React.Fragment>
        )
    }


    signin(invoker) {

        /* THE SIGNIN PROCESS IS NOT FINISHED YET */
        /* THIS CONDITION LOCKS THE SIGNIN BUSTTON */
        if (invoker.isSigninDisable === true)
            return;

        this.isSigninDisable = true;
        this.signinButtonRef.current.disabled = true;
        this.signinButtonRef.current.style.cursor = 'no-drop';
        this.signinMessageRef.current.style.color = '#116805';
        this.signinMessageRef.current.innerText = commonMessages.wait;

        let userService = new UserService();
        let user = new User();
        user.userName = invoker.signinViewModel.username;
        user.password = invoker.signinViewModel.password;
        (invoker.signinViewModel.rememberMe === true) ? user.rememberMe = true : user.rememberMe = false;

        userService.signIn(user, (response) => {

            if (response.isSuccessful === true) {


                if (response['hasAuthKey']) {
                    if (response['hasAuthKey'] === true) {
                        /* SET REMEMBER ME COOKIE */
                        setCookie({ key: 'authKey', value: response.outputJson.authKey }, 365);
                    }
                }

                userService.getUserDetail((response) => {

                    /* KEEP USER INFORMATION IN SESSION STORAGE */
                    window.sessionStorage.setItem('userName', response.outputJson.userDetail.name);
                    window.sessionStorage.setItem('userLastName', response.outputJson.userDetail.lastName);
                    invoker.setState({ isAuthenticated: AuthenticationState.Authenticated });
                });


            } else {

                let errorMessage = '';

                if (response.serverValidations.length != 0) {

                    //Check if server encounters any error
                    errorMessage = response.serverValidations[0];
                }
                else if (response.clientValidations.length != 0) {

                    // Check if the client encounters any error
                    errorMessage = response.clientValidations[0];
                }

                /* LET SIGNIN BUTTON FREE */
                this.isSigninDisable = false;
                this.signinButtonRef.current.disabled = false;
                this.signinButtonRef.current.style.cursor = 'pointer';
                this.signinMessageRef.current.style.color = '#D9183B';
                this.signinMessageRef.current.innerText = errorMessage;

                /* *IMPROVE */
                this.setState({
                    isAuthenticated: AuthenticationState.NotAuthenticated
                });

            }
        });
    }
}