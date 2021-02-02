import { PracticeType } from "../../entity/global/practice-type";
import Score from "../../entity/score-box/score-box";

export const createStarArray = (score: Score, practiceType: PracticeType): string[] => {

    let stars: string[] = [];
    const empty = 'emptyStar';
    const filled = 'filledStar';
    const half = 'halfStar';
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
            break;
        default: actual_score = 0;
    }



    const integral = Math.floor(actual_score);
    const decimal = actual_score % 1;

    for (let i = 0; i < integral; i++) {
        stars.push(filled);
    }
    if (decimal >= 0.5) {
        stars.push(half);
        const emptyCount = Math.floor(6 - actual_score);
        for (let i = 0; i < emptyCount; i++) {
            stars.push(empty);
        }
    }
    else {
        const emptyCount = Math.ceil(6 - actual_score);
        for (let i = 0; i < emptyCount; i++) {
            stars.push(empty);
        }
    }
    return stars;
}

export interface IScoreTypePair {
    score: number;
    type: PracticeType;
}
export const sortScoreTypeByScore = (arrayScoreType: IScoreTypePair[]): IScoreTypePair[] => {

    return arrayScoreType.sort((a: IScoreTypePair, b: IScoreTypePair) => {
        return (b.score - a.score);
    });

}