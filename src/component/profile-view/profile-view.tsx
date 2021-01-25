import React, { Fragment, useEffect, useState } from 'react';
import ProfileWhiteBox from './profile-white-box';
import { Email } from '../email/email';
import { Cellphone } from '../cellphone/cellphone';
import WhiteRibbon from '../white-ribbon/white-ribbon';
import { ScoreBox } from '../score-box/score-box';
import './css/profile-view.css';
import { PracticeType } from '../../entity/global/practice-type';
import { AuthenticationState } from '../../entity/global/authentication-state-novel';
import SimpleNarrowWaiting from '../simple-waiting/simple-waiting';
import { commonMessages } from '../../resource/text/common-messages';
import { appGeneralInfo } from '../../setup-general-information';
import { SimpleNarrowMessage } from '../simple-narrow-message/simple-narrow-message';
import { GlobalMessageType } from '../../entity/global-message/enum/global-message-type';
import ErrorMessage from '../../resource/text/error-message';
import UserService from '../../service/user-service/user-service-novel';

export default function ProfileView(): JSX.Element {

    const profileTitle = 'Your Account';
    const [isAuthenticated, setIsAuthenticated] = useState(AuthenticationState.NotSet);
    useEffect(() => {
        const userService = new UserService();
        userService.isUserAuthenticated()
            .then((response) => {                
                setIsAuthenticated(response.outputJson as AuthenticationState);
            });
    }, []);


    return (
        <div className={'profileContainer'}>

            {
                (isAuthenticated === AuthenticationState.NotSet) ?
                    (<SimpleNarrowWaiting />) : (
                        <Fragment>
                            {
                                (isAuthenticated === AuthenticationState.Authenticated) ?
                                    (
                                        <React.Suspense fallback={<h3>{commonMessages.loading}</h3>}>
                                            <div style={{ visibility: 'hidden' }}>
                                                {
                                                    (window.location.href = appGeneralInfo.baseUrl +
                                                        appGeneralInfo.mainMenuItems.homePage)
                                                }
                                            </div>
                                        </React.Suspense>

                                    ) :

                                    (

                                        <Fragment>

                                            {
                                                (isAuthenticated === AuthenticationState.CommunicationError) ?
                                                    (<SimpleNarrowMessage type={GlobalMessageType.Error} link={''} linkTitle={''} messgae={ErrorMessage.Err0007()} />) :
                                                    (
                                                        <Fragment>
                                                            <WhiteRibbon />
                                                            <div className={'profileTitle'}>{profileTitle}</div>
                                                            <div className={'profileInformationContainer'}>
                                                                <div className={'profileUserDetailContainer'}>
                                                                    <ProfileWhiteBox />
                                                                    <Email />
                                                                    <Cellphone />
                                                                </div>
                                                                <div className={'profileScoreBoxContainer'}>
                                                                    <ScoreBox {...PracticeType.Listening} />
                                                                    <ScoreBox {...PracticeType.Reading} />
                                                                    <ScoreBox {...PracticeType.Writing} />
                                                                    <ScoreBox {...PracticeType.Speaking} />
                                                                    <ScoreBox {...PracticeType.Vocabulary} />
                                                                    <ScoreBox {...PracticeType.Slang} />
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