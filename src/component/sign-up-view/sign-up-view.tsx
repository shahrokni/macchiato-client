import React, { useEffect, useState } from 'react';
import SignupLogoBox from './sign-up-logo-box';
import { SignUpWhiteBox } from './sign-up-white-box';
import IAppIntroducer from '../../entity/app-introducer/interface/IAppIntroducer';
import IntroducerService from '../../service/introducer-service/introducer-service';
import SimpleNarrowWaiting from '../../component/simple-waiting/simple-waiting';
import './css/sign-up-view.css';
import { AuthenticationState } from '../../entity/global/authentication-state';
import UserService from '../../service/user-service/user-service-novel';
import { commonMessages } from '../../resource/text/common-messages';
import { appGeneralInfo } from '../../setup-general-information';

let appIntroducers: IAppIntroducer[] = [];
export default function SignUpView() {

    const [isUserAuthenticated, setIsUserAuthenticated] = useState(AuthenticationState.NotSet);

    useEffect(() => {       
        const userService = new UserService();
        userService.isUserAuthenticated()
            .then((res) => {
                console.log(res);
                if (res === false) {
                    const introducerService = new IntroducerService();
                    introducerService.getAllIntroducers()
                        .then((introducers) => {
                            appIntroducers = introducers as IAppIntroducer[];
                            setIsUserAuthenticated(AuthenticationState.NotAuthenticated);
                        });
                }
                else if (res === true) {
                    setIsUserAuthenticated(AuthenticationState.Authenticated);
                }
                else {
                    /* TODO */
                }
            })
    });
    return (
        <div className='signupViewContainer'>
            <SignupLogoBox />
            {
                (isUserAuthenticated === AuthenticationState.NotSet) ?
                    <SimpleNarrowWaiting /> : (
                        (isUserAuthenticated === AuthenticationState.NotAuthenticated)
                            ? (<SignUpWhiteBox appIntroducers={appIntroducers} />)
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