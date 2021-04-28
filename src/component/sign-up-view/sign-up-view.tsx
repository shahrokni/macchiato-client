import React, { useEffect, useState } from 'react';
import SignupLogoBox from './sign-up-logo-box';
import { SignUpWhiteBox } from './sign-up-white-box';
import SimpleNarrowWaiting from '../../component/simple-waiting/simple-waiting';
import './css/sign-up-view.css';
import { AuthenticationState } from '../../entity/global/authentication-state-novel';
import UserService from '../../service/user-service/user-service-novel';
import { commonMessages } from '../../resource/text/common-messages';
import { appGeneralInfo } from '../../setup-general-information';


export default function SignUpView():JSX.Element {

    const [isUserAuthenticated, setIsUserAuthenticated] = useState(AuthenticationState.NotSet);
    useEffect(() => {
        const userService = new UserService();
        userService.isUserAuthenticated()
            .then((response) => {
                setIsUserAuthenticated(response.outputJson as AuthenticationState);
            })
    }, []);
    return (
        <div className='signupViewContainer'>
            <SignupLogoBox />
            {
                (isUserAuthenticated === AuthenticationState.NotSet) ?
                    <SimpleNarrowWaiting /> : (
                        (isUserAuthenticated === AuthenticationState.NotAuthenticated)
                            ? (<SignUpWhiteBox />)
                            : (
                                <React.Suspense fallback={<h3>{commonMessages.loading}</h3>}>
                                    <div style={{ visibility: 'hidden' }}>
                                        {
                                            (window.location.href = appGeneralInfo.baseUrl +
                                                appGeneralInfo.mainMenuItems.homePage)
                                        }
                                    </div>
                                </React.Suspense>
                            ))
            }
        </div>
    );
}