import React, { useEffect, useState } from 'react';
import { PracticeType } from '../../entity/global/practice-type';
import { createStarArray } from '../../util/score-util/score-util';
import Score from '../../entity/score-box/score-box';
import './css/score-box.css'

export interface IScoreBox {
    score: Score,
    practiceType: PracticeType
}

export const ScoreBox = (scoreBoxPram: IScoreBox): JSX.Element => {

    const [isReady, setIsReady] = useState(false);
    const [scoreData, setScoreData] = useState<Score | null>(null);
    const [practiceTypeData, setPracticeTypeData] = useState<PracticeType | null>(null);

    useEffect(() => {
        setPracticeTypeData(scoreBoxPram.practiceType);
        setScoreData(scoreBoxPram.score);
        setIsReady(true)
    }, []);

    return (
        <div className={'scoreBoxContainer'}>
            <div className={'scoreBoxRow'}>
                {getScoreBoxText(scoreBoxPram.practiceType)}
            </div>
            <div className={'scoreBoxRow'}>
                <div className={'starsRow'}>
                    {(isReady && scoreData) && createStarElements(scoreData, practiceTypeData as PracticeType)}
                    <div className={'scoreNumber'}>
                        {(isReady && scoreData) && ('(' + calculateScoreNumber(scoreData, practiceTypeData as PracticeType) + ')')}
                    </div>
                </div>
            </div>
        </div>
    );
}

const getScoreBoxText = (practiceType: PracticeType): JSX.Element => {

    let TextElemet = `Your <span class='scoreBoxSkillTitlBold'> @ </span> level`;
    switch (practiceType) {
        case PracticeType.Listening:
            TextElemet = TextElemet.replace("@", "Listening");
            break;
        case PracticeType.Reading:
            TextElemet = TextElemet.replace("@", "Reading");
            break;
        case PracticeType.Speaking:
            TextElemet = TextElemet.replace("@", "Speaking");
            break;
        case PracticeType.Writing:
            TextElemet = TextElemet.replace("@", "Writing");
            break;
        case PracticeType.Vocabulary:
            TextElemet = TextElemet.replace("@", "Vocabulary");
            break;
        case PracticeType.Slang:
            TextElemet = TextElemet.replace("@", "Slang");
            break;
        default:
            TextElemet.replace("@", " ");
    }
    return <div dangerouslySetInnerHTML={{ __html: TextElemet }}></div>
}

const createStarElements = (score: Score, practiceType: PracticeType): JSX.Element[] => {
    let stars: JSX.Element[] = [];
    const starArray = createStarArray(score, practiceType);
    starArray.forEach((starState, idx) => {
        stars.push(<div className={'starSquare ' + starState} key={'star-' + idx}></div>);
    })
    return stars;
}

const calculateScoreNumber = (score: Score, practiceType: PracticeType): number => {
    let actual_score = 0;
    switch (practiceType) {
        case PracticeType.Listening: actual_score = score.listeningScore;
            break;
        case PracticeType.Reading: actual_score = score.readingScore;
            break;
        case PracticeType.Writing: actual_score = score.writingScore;
            break;
        case PracticeType.Speaking: actual_score = score.speakingScore;
            break;
        case PracticeType.Slang: actual_score = score.slangScore;
            break;
        case PracticeType.Vocabulary: actual_score = score.vocabScore;
        default: actual_score = 0;
    }
    return Math.round(actual_score);
}