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

        this.state = { sigingmessage: '', isAuthenticated: AuthenticationState.NotSet };

        this.signinViewModel = {
            username: undefined,
            password: undefined
        }
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
                        <WelcomeBox text="Welcome to English Macchiato" />
                        <div className="signInViewContainer">
                            <SigInLogo />
                            <SignInWhiteBox
                                siginmessage={this.state.sigingmessage}
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
                                window.location.href = appGeneralInfo.baseUrl+
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

        let userService = new UserService();
        let user = new User();
        user.userName = invoker.signinViewModel.username;
        user.password = invoker.signinViewModel.password;
        userService.signIn(user, (serverResponse) => {

        });
    }

}