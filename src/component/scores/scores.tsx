import React, { Fragment, useEffect, useState } from 'react';
import UserService from '../../service/user-service/user-service-novel';
import './css/scores.css';
import SimpleNarrowWaiting from '../simple-waiting/simple-waiting';
import Score from '../../entity/score-box/score-box';
import { PracticeType } from '../../entity/global/practice-type';
import { sortScoreTypeByScore, IScoreTypePair } from '../../util/score-util/score-util';
import { ScoreBox } from '../score-box/score-box';


interface IScoreArrData {
    score: number;
    type: PracticeType;
}

export default function Scores(): JSX.Element {

    const [orderedScoreArray, setOrderedScoreArray] = useState<IScoreTypePair[]>([]);
    const [scoreData, setScoreData] = useState<Score>();
    const [isComponentLoaded, setIsComponentLoaded] = useState(false);
    useEffect(() => {
        const userService = new UserService();
        userService.getScore().then((response) => {
            if (response && response.isSuccessful && response.outputJson) {
                const scoreArr: IScoreArrData[] = [];
                const score = new Score();
                score.listeningScore = response.outputJson.listeningScore;
                scoreArr.push({ score: score.listeningScore, type: PracticeType.Listening });
                score.readingScore = response.outputJson.readingScore;
                scoreArr.push({ score: score.readingScore, type: PracticeType.Reading });
                score.writingScore = response.outputJson.writingScore;
                scoreArr.push({ score: score.writingScore, type: PracticeType.Writing });
                score.speakingScore = response.outputJson.speakingScore;
                scoreArr.push({ score: score.speakingScore, type: PracticeType.Speaking });
                score.slangScore = response.outputJson.slangScore;
                scoreArr.push({ score: score.slangScore, type: PracticeType.Slang });
                score.vocabScore = response.outputJson.vocabScore;
                scoreArr.push({ score: score.vocabScore, type: PracticeType.Vocabulary });
                const sortedScoreArray = sortScoreTypeByScore(scoreArr);
                setOrderedScoreArray(sortedScoreArray);
                setScoreData(score);
                setIsComponentLoaded(true);
            }
            else {
                setIsComponentLoaded(false);
            }
        });
    }, []);
    return (
        <Fragment>
            {
                (orderedScoreArray && orderedScoreArray.length != 0 && isComponentLoaded) ?
                    <Fragment>
                        <ScoreBox practiceType={orderedScoreArray[0].type}
                            score={scoreData as Score} />
                        <ScoreBox practiceType={orderedScoreArray[1].type}
                            score={scoreData as Score} />
                        <ScoreBox practiceType={orderedScoreArray[2].type}
                            score={scoreData as Score} />
                        <ScoreBox practiceType={orderedScoreArray[3].type}
                            score={scoreData as Score} />
                        <ScoreBox practiceType={orderedScoreArray[4].type}
                            score={scoreData as Score} />
                        <ScoreBox practiceType={orderedScoreArray[5].type}
                            score={scoreData as Score} />
                    </Fragment> :
                    <SimpleNarrowWaiting />
            }
        </Fragment>
    )
}