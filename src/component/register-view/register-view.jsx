import React from 'react';
import './css/register-view.css';
import WelcomeBox from '../welcome-box/welcome-box';
import RegisterBox from './register-box.jsx';
import UserService from '../../service/user-service/user-service-novel';
import { AuthenticationState } from '../../entity/global/authentication-state';
import SimpleNarrowWaiting from '../simple-waiting/simple-waiting';
import { appGeneralInfo } from '../../setup-general-information';
import { commonMessages } from '../../resource/text/common-messages';

export default class RegisterView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isUserAuthenticated: AuthenticationState.NotSet }
    }
    componentDidMount() {
        const userService = new UserService();
        userService.isUserAuthenticated()
            .then((res) => {
                if (res === true) {
                    this.setState({ isUserAuthenticated: AuthenticationState.Authenticated });
                }
                else if (res === false) {
                    this.setState({ isUserAuthenticated: AuthenticationState.NotAuthenticated });
                }
                else {
                    this.setState({ isUserAuthenticated: AuthenticationState.NotSet });
                }
            })
    }
    render() {
        return (
            <div className='fullSize absolute'>
                {
                    (this.state.isUserAuthenticated === AuthenticationState.NotSet) ?
                        (<SimpleNarrowWaiting />)
                        : (
                            (this.state.isUserAuthenticated === AuthenticationState.NotAuthenticated) ?
                                (<React.Fragment>
                                    <WelcomeBox />
                                    <RegisterBox linkClick={this.props.linkClick} />
                                </React.Fragment>) : (
                                    <React.Suspense fallback={<h3>{commonMessages.loading}</h3>}>
                                        <div style={{ visibility: 'hidden' }}>
                                            {
                                                (window.location.href = appGeneralInfo.baseUrl +
                                                    appGeneralInfo.mainMenuItems.homePage)
                                            }
                                        </div>
                                    </React.Suspense>
                                )
                        )
                }
            </div>
        );
    }
}