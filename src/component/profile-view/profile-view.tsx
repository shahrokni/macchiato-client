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
import { sortScoreTypeByScore, IScoreTypePair } from '../../util/score-util/score-util';

export default function ProfileView(): JSX.Element {
    const profileTitle = 'Your Account';
    const [isAuthenticated, setIsAuthenticated] = useState(AuthenticationState.NotSet);
    const [scoreData, setScoreData] = useState<Score | null>(null);
    const [orderedScoreArray, setOrderedScoreArray] = useState<IScoreTypePair[]>([]);

    useEffect(() => {
        const userService = new UserService();
        userService.isUserAuthenticated()
            .then((authResponse) => { 
                setIsAuthenticated(authResponse.outputJson as AuthenticationState);                          
                userService.getScore()
                    .then((scoreResponse) => {                      
                        if (scoreResponse && scoreResponse.outputJson) {
                            const scoreArr = [];
                            const score = new Score();
                            score.listeningScore = scoreResponse.outputJson.listeningScore;
                            scoreArr.push({ score: score.listeningScore, type: PracticeType.Listening });
                            score.readingScore = scoreResponse.outputJson.readingScore;
                            scoreArr.push({ score: score.readingScore, type: PracticeType.Reading });
                            score.writingScore = scoreResponse.outputJson.writingScore;
                            scoreArr.push({ score: score.writingScore, type: PracticeType.Writing });
                            score.speakingScore = scoreResponse.outputJson.speakingScore;
                            scoreArr.push({ score: score.speakingScore, type: PracticeType.Speaking });
                            score.slangScore = scoreResponse.outputJson.slangScore;
                            scoreArr.push({ score: score.slangScore, type: PracticeType.Slang });
                            score.vocabScore = scoreResponse.outputJson.vocabScore;
                            scoreArr.push({ score: score.vocabScore, type: PracticeType.Vocabulary });
                            const sortedScoreArray = sortScoreTypeByScore(scoreArr);
                            setOrderedScoreArray(sortedScoreArray);
                            setScoreData(score);                            
                        }

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
                                                                    {
                                                                     (orderedScoreArray && orderedScoreArray.length!=0)?<Fragment>
                                                                    <ScoreBox practiceType={orderedScoreArray[0].type} score={scoreData as Score} />
                                                                    <ScoreBox practiceType={orderedScoreArray[1].type} score={scoreData as Score} />
                                                                    <ScoreBox practiceType={orderedScoreArray[2].type} score={scoreData as Score} />
                                                                    <ScoreBox practiceType={orderedScoreArray[3].type} score={scoreData as Score} />
                                                                    <ScoreBox practiceType={orderedScoreArray[4].type} score={scoreData as Score} />
                                                                    <ScoreBox practiceType={orderedScoreArray[5].type} score={scoreData as Score} />
                                                                    </Fragment> :<SimpleNarrowWaiting/>
                                                                     }
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