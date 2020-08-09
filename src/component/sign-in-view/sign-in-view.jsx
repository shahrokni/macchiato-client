import React from 'react';
import './css/sign-in-view.css';
import SigInLogo from './sign-in-logo';
import SignInWhiteBox from './sign-in-white-box';
import WelcomeBox from '../welcome-box/welcome-box';
import UserService from '../../service/user-service/user-service';
import { AuthenticationState } from '../../entity/global/authentication-state';
import User from '../../entity/user/user';
import { appGeneralInfo } from '../../setup-general-information';

export default class SignInView extends React.Component {

    constructor(props) {

        super(props);

        this.state = { siginmessage: '', isAuthenticated: AuthenticationState.NotSet };

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
        return (
            <React.Fragment>

                {isUserAuthenticated === AuthenticationState.NotAuthenticated &&

                    <React.Fragment>
                        <WelcomeBox />
                        <div className="signInViewContainer">
                            <SigInLogo />
                            <SignInWhiteBox
                                siginmessage={this.state.siginmessage}
                                signinViewModel={this.signinViewModel}
                                signinAction={() => {
                                    this.signin(this)
                                }}
                                linkClick={this.props.linkClick} />
                        </div>
                    </React.Fragment>
                }
                {isUserAuthenticated === AuthenticationState.Authenticated &&
                    <React.Suspense fallback={<h3>Loading ...</h3>}>
                        <div style={{ visibility: 'hidden' }}>
                            {
                                window.location.href = appGeneralInfo.baseUrl +
                                appGeneralInfo.mainMenuItems.homePage
                            }
                        </div>
                    </React.Suspense>
                }
                {isUserAuthenticated === AuthenticationState.CommunicationError &&
                    <React.Suspense fallback={<h3>Loading ...</h3>}>
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

        let userService = new UserService();
        let user = new User();
        user.userName = invoker.signinViewModel.username;
        user.password = invoker.signinViewModel.password;

        userService.signIn(user, (response) => {

            if (response.isSuccessful === true) {

                invoker.setState({ isAuthenticated: AuthenticationState.Authenticated });

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

                this.setState({
                    isAuthenticated: AuthenticationState.NotAuthenticated,
                    siginmessage: errorMessage
                });

            }
        });
        this.setState({ isAuthenticated: AuthenticationState.NotAuthenticated, siginmessage: '' });
    }    
}