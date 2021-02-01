import React, { Fragment, useEffect, useState } from 'react';
import ProfileWhiteBox from './profile-white-box';
import { Email } from '../email/email';
import { Cellphone } from '../cellphone/cellphone';
import WhiteRibbon from '../white-ribbon/white-ribbon';
import { ScoreBox } from '../score-box/score-box';
import './css/profile-view.css';
import { AuthenticationState } from '../../entity/global/authentication-state-novel';
import SimpleNarrowWaiting from '../simple-waiting/simple-waiting';
import { commonMessages } from '../../resource/text/common-messages';
import { appGeneralInfo } from '../../setup-general-information';
import { SimpleNarrowMessage } from '../simple-narrow-message/simple-narrow-message';
import { GlobalMessageType } from '../../entity/global-message/enum/global-message-type';
import ErrorMessage from '../../resource/text/error-message';
import UserService from '../../service/user-service/user-service-novel';
import { PracticeType } from '../../entity/global/practice-type';
import Score from '../../entity/score-box/score-box';
import './css/profile-view.css';

export default function ProfileView(): JSX.Element {
    const profileTitle = 'Your Account';
    const [isAuthenticated, setIsAuthenticated] = useState(AuthenticationState.NotSet);
    const [scoreData, setScoreData] = useState<Score | null>(null);

    useEffect(() => {
        const userService = new UserService();
        userService.isUserAuthenticated()
            .then((authResponse) => {
                userService.getScore()
                    .then((scoreResponse) => {
                        if (scoreResponse && scoreResponse.outputJson) {
                            const score = new Score();
                            score.listeningScore = scoreResponse.outputJson.listeningScore;
                            score.readingScore = scoreResponse.outputJson.readingScore;
                            score.writingScore = scoreResponse.outputJson.writingScore;
                            score.speakingScore = scoreResponse.outputJson.speakingScore;
                            score.slangScore = scoreResponse.outputJson.slangScore;
                            score.vocabScore = scoreResponse.outputJson.vocabScore;
                            setScoreData(score);
                        }
                        setIsAuthenticated(authResponse.outputJson as AuthenticationState);
                    })
            });
    }, []);


    return (
        <div className={'profileContainer'}>

            {
                (isAuthenticated === AuthenticationState.NotSet) ?
                    (<SimpleNarrowWaiting />) : (
                        <Fragment>
                            {
                                (isAuthenticated === AuthenticationState.NotAuthenticated) ?
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
                                                                    <ScoreBox practiceType={PracticeType.Listening} score={scoreData as Score} />
                                                                    <ScoreBox practiceType={PracticeType.Reading} score={scoreData as Score} />
                                                                    <ScoreBox practiceType={PracticeType.Writing} score={scoreData as Score} />
                                                                    <ScoreBox practiceType={PracticeType.Speaking} score={scoreData as Score} />
                                                                    <ScoreBox practiceType={PracticeType.Vocabulary} score={scoreData as Score} />
                                                                    <ScoreBox practiceType={PracticeType.Slang} score={scoreData as Score} />
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