import React, { Fragment, useEffect, useState } from 'react';
import ProfileWhiteBox from './profile-white-box';
import { Email } from '../email/email';
import { Cellphone } from '../cellphone/cellphone';
import WhiteRibbon from '../white-ribbon/white-ribbon';
import './css/profile-view.css';
import { AuthenticationState } from '../../entity/global/authentication-state-novel';
import SimpleNarrowWaiting from '../simple-waiting/simple-waiting';
import { commonMessages } from '../../resource/text/common-messages';
import { appGeneralInfo } from '../../setup-general-information';
import { SimpleNarrowMessage } from '../simple-narrow-message/simple-narrow-message';
import { GlobalMessageType } from '../../entity/global-message/enum/global-message-type';
import ErrorMessage from '../../resource/text/error-message';
import UserService from '../../service/user-service/user-service-novel';
import './css/profile-view.css';
import Scores from '../scores/scores';

export default function ProfileView(): JSX.Element {

    const profileTitle = 'Your Account';
    const logoutBtnId = 'logoutBtn'
    const [isAuthenticated, setIsAuthenticated] = useState(AuthenticationState.NotSet);
    const [isLocked, setIsLocked] = useState(false);
    const [isComponentLoaded, setIsComponentLoaded] = useState(false);
    useEffect(() => {
        const userService = new UserService();
        userService.isUserAuthenticated()
            .then((authResponse) => {
                setIsAuthenticated(authResponse.outputJson as AuthenticationState);
                setIsComponentLoaded(true);
            });
    }, []);


    const manageForm = (locked: boolean): () => void => {
        const cursor = (!locked) ? 'pointer' : 'no-drop';
        return () => {
            (!isLocked) ? setIsLocked(false) : setIsLocked(true);
            const updateBtn = document.getElementById(logoutBtnId);
            (updateBtn) && (updateBtn.style.cursor = cursor);
        }
    }


    const logout = (): void => {

        if (isLocked === true || !isComponentLoaded)
            return;

        (manageForm(true))();
        const userService = new UserService();
        userService.logout()
            .then((response) => {
                if (response && response.isSuccessful) {
                    setIsAuthenticated(AuthenticationState.NotAuthenticated);
                }
                else {
                    (manageForm(false))();
                }
            });
    }

    return (
        <div className={'profileContainer'}>

            {
                (isAuthenticated === AuthenticationState.NotSet) ?
                    (<SimpleNarrowWaiting />) : (
                        <Fragment>
                            {
                                (isAuthenticated === AuthenticationState.NotAuthenticated) ?
                                    (
                                        <React.Suspense
                                            fallback={<h3>{commonMessages.loading}</h3>}>
                                            <div style={{ visibility: 'hidden' }}>
                                                {
                                                    (window.location.href =
                                                        appGeneralInfo.baseUrl +
                                                        appGeneralInfo
                                                            .mainMenuItems.homePage)
                                                }
                                            </div>
                                        </React.Suspense>

                                    ) :

                                    (

                                        <Fragment>

                                            {
                                                (isAuthenticated ===
                                                    AuthenticationState
                                                        .CommunicationError) ?
                                                    (<SimpleNarrowMessage
                                                        type={GlobalMessageType.Error}
                                                        link={''}
                                                        linkTitle={''}
                                                        messgae={ErrorMessage.Err0007()} />)
                                                    :
                                                    (
                                                        <Fragment>
                                                            <WhiteRibbon />

                                                            <div
                                                                className={'profileTitleBar'}>
                                                                <div
                                                                    className={'profileTitle'}>
                                                                    {profileTitle}
                                                                </div>
                                                                <div
                                                                    id={logoutBtnId}
                                                                    onClick={() => { logout() }}
                                                                    className={'logoutBtn'}>
                                                                    <i
                                                                        className="material-icons logoutText absolute">
                                                                        {'logout'}</i>
                                                                </div>
                                                            </div>

                                                            <div className={'profileInformationContainer'}>
                                                                <div className={'profileUserDetailContainer'}>
                                                                    <ProfileWhiteBox />
                                                                    <Email />
                                                                    <Cellphone />
                                                                </div>
                                                                <div className={'profileScoreBoxContainer'}>
                                                                    <Scores />
                                                                </div>
                                                            </div>
                                                        </Fragment>
                                                    )
                                            }

                                        </Fragment>
                                    )
                            }
                        </Fragment>
                    )
            }

        </div>
    );
}