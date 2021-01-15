import React, { useEffect, useState } from 'react';
import { PracticeType } from '../../entity/global/practice-type';
import { createStarArray } from '../../util/score-util/score-util';
import Score from '../../entity/score-box/score-box';
import UserService from '../../service/user-service/user-service-novel';

export const ScoreBox = (practiceType: PracticeType): JSX.Element => {

    const [isReady, setIsReady] = useState(false);
    const [scoreData, setScoreData] = useState<Score | null>(null);

    useEffect(() => {
        const userService = new UserService();
        userService.getScore(practiceType)
            .then((res) => {
                setScoreData(res.outputJson as Score);
                setIsReady(true);
            })
            .catch((err) => {

            })
    }, []);

    return (
        <div className={'scoreBoxContainer'}>
            <div className={'scoreBoxRow'}>
                {getScoreBoxText(practiceType)}
            </div>
            <div className={'scoreBoxRow'}>
                <div className={'starsRow'}>
                    {(isReady && scoreData) && createStarElements(scoreData.score)}
                </div>
                <div className={'scoreNumber'}>
                    {(isReady && scoreData) && ('(' + Math.round(scoreData.score) + ')')}
                </div>
            </div>
        </div>
    );
}

const getScoreBoxText = (practiceType: PracticeType): JSX.Element => {

    let TextElemet = `Your <span style='color:'#D9183B''>@</span> level`;
    switch (practiceType) {
        case PracticeType.Listening:
            TextElemet.replace("@", "Listening");
            break;
        case PracticeType.Reading:
            TextElemet.replace("@", "Reading");
            break;
        case PracticeType.Speaking:
            TextElemet.replace("@", "Speaking");
            break;
        case PracticeType.Writing:
            TextElemet.replace("@", "Writing");
            break;
        case PracticeType.Vocabulary:
            TextElemet.replace("@", "Vocabulary");
            break;
        case PracticeType.Slang:
            TextElemet.replace("@", "Slang");
            break;
        default:
            TextElemet.replace("@", " ");
    }
    return <div dangerouslySetInnerHTML={{ __html: TextElemet }}></div>
}

const createStarElements = (score: number): JSX.Element[] => {
    let stars: JSX.Element[] = [];
    const starArray = createStarArray(score);
    starArray.forEach((state, idx) => {
        stars.push(<div className={state} key={'star-' + idx}></div>);
    })
    return stars;
}