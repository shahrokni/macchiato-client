import {iso2ShortDate} from '../date-util2';
const d = new Date('2021-02-22T15:05:41.215Z');
test('when d is 2021-02-22T15:05:41.215Z, the output is 22 Feb 2021',()=>{
    expect(iso2ShortDate(d)).toBe('22 Feb 2021');
});
