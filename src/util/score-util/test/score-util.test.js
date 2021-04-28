import { createStarArray, sortScoreTypeByScore } from '../score-util';
import Score from '../../../entity/score-box/score-box';
import { PracticeType } from '../../../entity/global/practice-type';
/*CREATE STAR ARRAY TESTING*/
const score1 = new Score();
score1.listeningScore = 0;
test('when the score is 0', () => {
    const correctResult = 'emptyStar,emptyStar,emptyStar,emptyStar,emptyStar,emptyStar';
    expect(createStarArray(score1, PracticeType.Listening).toString()).toBe(correctResult);
});
/*CREATE STAR ARRAY TESTING*/
const score2 = new Score();
score2.readingScore = 1;
test('when the score is 1', () => {
    const correctResult = 'filledStar,emptyStar,emptyStar,emptyStar,emptyStar,emptyStar';
    expect(createStarArray(score2, PracticeType.Reading).toString()).toBe(correctResult);
});
/*CREATE STAR ARRAY TESTING*/
const score3 = new Score();
score3.writingScore = 1.5;
test('when the score is 1.5', () => {
    const correctResult = 'filledStar,halfStar,emptyStar,emptyStar,emptyStar,emptyStar';
    expect(createStarArray(score3, PracticeType.Writing).toString()).toBe(correctResult);
});
/*CREATE STAR ARRAY TESTING*/
const score4 = new Score();
score4.speakingScore = 1.4;
test('when the score is 1.4', () => {
    const correctResult = 'filledStar,emptyStar,emptyStar,emptyStar,emptyStar,emptyStar';
    expect(createStarArray(score4, PracticeType.Speaking).toString()).toBe(correctResult);
});
/*CREATE STAR ARRAY TESTING*/
const score5 = new Score();
score5.slangScore = 1.8;
test('when the score is 1.8', () => {
    const correctResult = 'filledStar,halfStar,emptyStar,emptyStar,emptyStar,emptyStar';
    expect(createStarArray(score5, PracticeType.Slang).toString()).toBe(correctResult);
});
/*CREATE STAR ARRAY TESTING*/
const score6 = new Score();
score6.slangScore = 6;
test('when the score is 6 (Complete Score)', () => {
    const correctResult = 'filledStar,filledStar,filledStar,filledStar,filledStar,filledStar';
    expect(createStarArray(score6, PracticeType.Slang).toString()).toBe(correctResult);
});
/*CREATE STAR ARRAY TESTING*/
const score7 = new Score();
score7.vocabScore = 4.6;
test('when the score is 4.6', () => {
    const correctResult = 'filledStar,filledStar,filledStar,filledStar,halfStar,emptyStar';
    expect(createStarArray(score7, PracticeType.Vocabulary).toString()).toBe(correctResult);
});
/*CREATE STAR ARRAY TESTING*/
const score8 = new Score();
score8.listeningScore = 4.2;
test('when the score is 4.2', () => {
    const correctResult = 'filledStar,filledStar,filledStar,filledStar,emptyStar,emptyStar';
    expect(createStarArray(score8, PracticeType.Listening).toString()).toBe(correctResult);
});
/* SORT SCORE TYPE BY SCORE  */
const scoreTypePrair = [];
scoreTypePrair.push(
    { score: 8, type: PracticeType.Listening },
    { score: 6, type: PracticeType.Reading },
    { score: 7, type: PracticeType.Writing },
    { score: 10, type: PracticeType.Speaking },
    { score: 9, type: PracticeType.Vocabulary },
    { score: 2, type: PracticeType.Slang });
const scoreTypePairExpected = [];
scoreTypePairExpected.push(
    { score: 10, type: PracticeType.Speaking },
    { score: 9, type: PracticeType.Vocabulary },
    { score: 8, type: PracticeType.Listening },
    { score: 7, type: PracticeType.Writing },
    { score: 6, type: PracticeType.Reading },
    { score: 2, type: PracticeType.Slang },
);
test('Ordered array items must be Speaking,Vocab,Listening,Writing,Reading, and Slang respectively',
    () => {
        expect(sortScoreTypeByScore(scoreTypePrair)).toEqual(scoreTypePairExpected);
    });
/* SORT SCORE TYPE BY SCORE  */