import {checkNameFormat,
  checkEmailFormat,
  checkStrongPassword,
  checkUserName,
  checkCellphone} from '../util/regex/string-regex';

import {
validateSignUpData,
validateUpdateData,
} from '../util/validation/user-validation'
import { UserDetail } from '../entity/user/userDetail';
import ErrorMessage from '../resource/text/error-message';

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
// Validators unit tests

test('Signup method validation has problem with userName, email, and name format',()=>{

  //Arrange 
  let userDetail = new UserDetail();
  userDetail.email = "Ali@com";
  userDetail.lastName = "123Shahrokni"
  userDetail.name = "Mahm1oud";
  userDetail.userName="Ali*1990";

  //Act 
  let errorMessages = validateSignUpData(userDetail);

  //Assert
  expect(errorMessages).toContain(ErrorMessage.ErrBu0003());
  expect(errorMessages).toContain(ErrorMessage.ErrBu0004());
  expect(errorMessages).toContain(ErrorMessage.ErrBu0005());
});

test('Update user information validation has problem with birthdate',()=>{
  //Arrange 
  let userDetail = new UserDetail();
  userDetail.birthDate = "MMYYDDDD";

  //Act
  let errorMessages = validateUpdateData(userDetail);

  //Assert 
  expect(errorMessages).toContain(ErrorMessage.ErrBu0007());
});
