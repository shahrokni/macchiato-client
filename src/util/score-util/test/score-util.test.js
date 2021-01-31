import {createStarArray} from '../score-util';
import Score from '../../../entity/score-box/score-box';
import { PracticeType } from '../../../entity/global/practice-type';
//Arrange
const score1 = new Score();
score1.listeningScore = 0;

test('when the score is 0',()=>{
    const correctResult = 'emptyStar,emptyStar,emptyStar,emptyStar,emptyStar,emptyStar';
    expect(createStarArray(score1,PracticeType.Listening).toString()).toBe(correctResult);
});

const score2 = new Score();
score2.readingScore = 1;

test('when the score is 1',()=>{
    const correctResult = 'filledStar,emptyStar,emptyStar,emptyStar,emptyStar,emptyStar';
    expect(createStarArray(score2,PracticeType.Reading).toString()).toBe(correctResult);
});

const score3 = new Score();
score3.writingScore = 1.5;

test('when the score is 1.5',()=>{
    const correctResult = 'filledStar,halfStar,emptyStar,emptyStar,emptyStar,emptyStar';
    expect(createStarArray(score3,PracticeType.Writing).toString()).toBe(correctResult);
});

const score4 = new Score();
score4.speakingScore = 1.4;

test('when the score is 1.4',()=>{
    const correctResult = 'filledStar,emptyStar,emptyStar,emptyStar,emptyStar,emptyStar';
    expect(createStarArray(score4,PracticeType.Speaking).toString()).toBe(correctResult);
});

const score5 = new Score();
score5.slangScore = 1.8;

test('when the score is 1.8',()=>{
    const correctResult = 'filledStar,halfStar,emptyStar,emptyStar,emptyStar,emptyStar';
    expect(createStarArray(score5,PracticeType.Slang).toString()).toBe(correctResult);
});


const score6 = new Score();
score6.slangScore = 6;

test('when the score is 6 (Complete Score)',()=>{
    const correctResult = 'filledStar,filledStar,filledStar,filledStar,filledStar,filledStar';
    expect(createStarArray(score6, PracticeType.Slang).toString()).toBe(correctResult);
});


const score7 = new Score();
score7.vocabScore = 4.6;
test('when the score is 4.6',()=>{
    const correctResult = 'filledStar,filledStar,filledStar,filledStar,halfStar,emptyStar';
    expect(createStarArray(score7,PracticeType.Vocabulary).toString()).toBe(correctResult);
});

const score8 = new Score();
score8.listeningScore = 4.2;
test('when the score is 4.2',()=>{
    const correctResult = 'filledStar,filledStar,filledStar,filledStar,emptyStar,emptyStar';
    expect(createStarArray(score8,PracticeType.Listening).toString()).toBe(correctResult);
});