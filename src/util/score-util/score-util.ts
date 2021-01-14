export const createStarArray = (score: number): string[] => {

    let stars: string[] = [];
    const empty = 'emptyStar';
    const filled = 'filledStar';
    const half = 'halfStar';

    const integral = Math.floor(score);
    const decimal = score % 1;

    for (let i = 0; i < integral; i++) {
        stars.push(filled);
    }
    if (decimal >= 0.5) {
        stars.push(half);
        const emptyCount = Math.floor(6 - score);
        for (let i = 0; i < emptyCount; i++) {
            stars.push(empty);
        }
    }
    else {
        const emptyCount = Math.ceil(6 - score);
        for (let i = 0; i < emptyCount; i++) {
            stars.push(empty);
        }
    }
    return stars;
}