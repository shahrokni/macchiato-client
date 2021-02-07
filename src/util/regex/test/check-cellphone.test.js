import {checkCellphone} from '../string-regex';

test('It must return false when the number has non numeric characters',()=>{
    const wrongNumber = '09126104851ss';
    expect(checkCellphone(wrongNumber)).toBe(false);
});

test('It must return false when the number has less than 11 characters',()=>{
    const wrongNumber = '0912610485';
    expect(checkCellphone(wrongNumber)).toBe(false);
});

test('It must return false when the number has more than 11 characters',()=>{
    const wrongNumber = '091261048511';
    expect(checkCellphone(wrongNumber)).toBe(false);
});

test('It must return false when the number has no numeric character',()=>{
    const wrongNumber = 'aababababab';
    expect(checkCellphone(wrongNumber)).toBe(false);
});

test('It must return false if the number doesnt start with 09 ',()=>{
    const wrongNumber = '19126104851';
    expect(checkCellphone(wrongNumber)).toBe(false);
})

test('It must return true beacause the given number is an Iranian standard cellphone number',()=>{
    const trueNumber = '09126104851';
    expect(checkCellphone(trueNumber)).toBe(true);
});