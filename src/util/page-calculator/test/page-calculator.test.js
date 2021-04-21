import calculatePage from '../page-calculator';
test('When the total of records is 10 and requested page is 0 the calculated page must be 0',()=>{
    expect(calculatePage(10,0)).toBe(0);
});

test('When the total of records is 10 and requested page is 1 the calculated page must be 0',()=>{
    expect(calculatePage(10,1)).toBe(0);
});

test('When the total of records is 11 and requested page is 1 the calculated page must be 1',()=>{
    expect(calculatePage(11,1)).toBe(1);
});


test('When the total of records is 21 and requested page is 2 the calculated page must be 2',()=>{
    expect(calculatePage(21,2)).toBe(2);
});