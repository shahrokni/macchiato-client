import {createStarArray} from '../score-util';
test('when the score is 0',()=>{
    const correctResult = 'emptyStar,emptyStar,emptyStar,emptyStar,emptyStar,emptyStar';
    expect(createStarArray(0).toString()).toBe(correctResult);
});
test('when the score is 1',()=>{
    const correctResult = 'filledStar,emptyStar,emptyStar,emptyStar,emptyStar,emptyStar';
    expect(createStarArray(1).toString()).toBe(correctResult);
});
test('when the score is 1.5',()=>{
    const correctResult = 'filledStar,halfStar,emptyStar,emptyStar,emptyStar,emptyStar';
    expect(createStarArray(1.5).toString()).toBe(correctResult);
});
test('when the score is 1.4',()=>{
    const correctResult = 'filledStar,emptyStar,emptyStar,emptyStar,emptyStar,emptyStar';
    expect(createStarArray(1.4).toString()).toBe(correctResult);
});
test('when the score is 1.8',()=>{
    const correctResult = 'filledStar,halfStar,emptyStar,emptyStar,emptyStar,emptyStar';
    expect(createStarArray(1.8).toString()).toBe(correctResult);
});
test('when the score is 6 (Complete Score)',()=>{
    const correctResult = 'filledStar,filledStar,filledStar,filledStar,filledStar,filledStar';
    expect(createStarArray(6).toString()).toBe(correctResult);
});
test('when the score is 4.6',()=>{
    const correctResult = 'filledStar,filledStar,filledStar,filledStar,halfStar,emptyStar';
    expect(createStarArray(4.6).toString()).toBe(correctResult);
});
test('when the score is 4.2',()=>{
    const correctResult = 'filledStar,filledStar,filledStar,filledStar,emptyStar,emptyStar';
    expect(createStarArray(4.2).toString()).toBe(correctResult);
});