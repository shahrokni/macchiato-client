import {checkNameFormat,
  checkEmailFormat,
  checkStrongPassword,
  checkUserName,
  checkCellphone} from '../util/regex/string-regex';

// Util - Regular Expression Unit Tests
test('m.shahrokny@gmail.com is a valid Email',()=>{expect(
  checkEmailFormat('m.shahrokny@gmail.com')
).toBe(true);});

test('Ali@yahoocom is not a valid Email',()=>{expect(
  checkEmailFormat('Ali@yahoocom')
).toBe(false);});


test('Mahmood Shahrokni is a valid name',()=>{expect(
  checkNameFormat('Mahmood Shahrokni')
).toBe(true);});


test('Mahmood123 is not a valid name',()=>{expect(
  checkNameFormat('Mahmood123')
).toBe(false);});

test('1234 is not a valid password',()=>{expect(
  checkStrongPassword("1234")
).toBe(false);});


test('12345 is a valid password',()=>{expect(
  checkStrongPassword("12345")
).toBe(true);});

test('09126104851 is a valid cellphone',()=>{expect(
  checkCellphone("09126104851")
).toBe(true);});

test('09375681787 is a valid cellphone',()=>{expect(
  checkCellphone("09375681787")
).toBe(true);});

test('101010 is not a valid cellphone',()=>{expect(
  checkCellphone("101010")
).toBe(false);});

test('m_sha1990 is a valid username',()=>{expect(
  checkUserName("m_sha1990")
).toBe(true);});


test('m.sha1990 is a valid username',()=>{expect(
  checkUserName("m.sha1990")
).toBe(true);});


test('Ali*1990 is not a valid username',()=>{expect(
  checkUserName("Ali*1990")
).toBe(false);});
//--------------------------------------------------------------