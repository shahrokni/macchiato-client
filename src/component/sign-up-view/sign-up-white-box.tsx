import React, { useState } from 'react';
import AppIntroducer from '../../entity/app-introducer/interface/IAppIntroducer';
import './css/sign-up-white-box.css';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText'
import { MenuItem } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import SimpleBtn from '../simple-btn/simple-btn';
import { RedDashedLink } from '../red-dashed-link/red-dashed-link';
import { checkNameFormat, checkUserName, checkStrongPassword } from '../../util/regex/string-regex';
import ErrorMessage from '../../resource/text/error-message';
import { IntroducerSelector } from '../introducer-selector/introducer-selector';
import UserService from '../../service/user-service/user-service';
import { UserDetail } from '../../entity/user/userDetail';
import { SignUpMessage } from './sign-up-message';
import { commonMessages } from '../../resource/text/common-messages';
import { appGeneralInfo } from '../../setup-general-information';
/*----- I N T E R F A C E --------*/
export interface SignUpStaticInfo {
    appIntroducers: AppIntroducer[]
}
/*-------------------------------*/
export const SignUpWhiteBox = (signUpStaticInfo: SignUpStaticInfo): JSX.Element => {
    const red = '#D9183B';
    const darkGreen = '#116805';
   
    /*----- INPUT VALUES OBJECT--*/
    let formState: {
        name: string,
        lastName: string,
        username: string,
        password: string,
        province: string,
        introducer: string,
        gender: string,
        conditionAgreement: boolean,

    } = {
        name: '',
        lastName: '',
        username: '',
        password: '',
        province: '',
        introducer: '',
        gender: '',
        conditionAgreement: false
    }
    /*---- S T A T E S -----*/
    const [isNameValid, setIsNameValid] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [isLastNameValid, setIsLastNameValid] = useState(false)
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
    const [isUserNameValid, setIsUserNameValid] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [isRepeatedPasswordValid, setIsRepeatedPasswordValid] = useState(false);
    const [repeatedPasswordErrorMessage, setRepeatedPasswordErrorMessage] = useState('');
    const [signupMessage, setsignupMessage] = useState('');
    const [signupMessageColor, setSignupMessageColor] = useState(red);
    const [isSignedUp, setIsSignedUp] = useState(false);
    /*------------L O C A L F U N C T I O N S -------------------------*/

    const trackNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const newValue = e.target.value;
        formState.name = newValue;
        const isValid = checkNameFormat(newValue);
        if (!isValid) {
            setIsNameValid(false);
            setNameErrorMessage(ErrorMessage.ErrBu0026())
        }
        else {
            setIsNameValid(true);
            setNameErrorMessage('');
        }
    }
    const trackLastNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const newValue = e.target.value;
        formState.lastName = newValue;
        const isValid = checkNameFormat(newValue);
        if (!isValid) {
            setIsLastNameValid(false);
            setLastNameErrorMessage(ErrorMessage.ErrBu0027());
        }
        else {
            setIsLastNameValid(true);
            setLastNameErrorMessage('');
        }
    }
    const trackUserName = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const newValue = e.target.value;
        formState.username = newValue;
        const isValid = checkUserName(newValue);
        if (!isValid) {
            setIsUserNameValid(false);
            setUsernameErrorMessage(ErrorMessage.ErrBu0004());
        }
        else {
            setIsUserNameValid(true);
            setUsernameErrorMessage('');
        }
    }
    const trackPassword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const newValue = e.target.value;
        formState.password = newValue;
        const isValid = checkStrongPassword(newValue);
        if (!isValid) {
            setIsPasswordValid(false);
            setPasswordErrorMessage(ErrorMessage.ErrBu0006());
        }
        else {
            setIsPasswordValid(true);
            setPasswordErrorMessage('');
        }
    }
    const trackRepeatedPassword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const newValue = e.target.value;
        if (newValue !== formState.password) {
            setIsRepeatedPasswordValid(false);
            setRepeatedPasswordErrorMessage(ErrorMessage.ErrBu0020());
        }
        else {
            setIsRepeatedPasswordValid(true);
            setRepeatedPasswordErrorMessage('');
        }
    }
    const agrre = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {

        if (formState.conditionAgreement === false) {
            formState.conditionAgreement = true;
            return;
        }
        formState.conditionAgreement = false;
    }

    const doSignup = (): void => {

        lockSignUpForm();
        showWaitingMessage();

        if (formState.conditionAgreement === false) {
            setSignupMessageColor(red);
            setsignupMessage(ErrorMessage.ErrBu0028());
            releaseSignUpForm();
            return;
        }

        const userService = new UserService();
        let userDetail = new UserDetail();
        userDetail.name = formState.name;
        userDetail.lastName = formState.lastName;
        userDetail.userName = formState.username;
        userDetail.password = formState.password;
        userDetail.province = formState.province;
        userDetail.gender = formState.gender;
        userDetail.introducerCode = formState.introducer;

        userService.signUp(userDetail, (serverResponse: any) => {
            if (serverResponse.isSuccessful === true) {
                userService.signIn({
                    username: formState.username,
                    password: formState.password
                }, (response:any) => {
                    if(response.isSuccessful===true){
                        setIsSignedUp(true);
                        return;
                    }
                    else{
                        setSignupMessageColor(red);
                        setsignupMessage( ErrorMessage.Err0000());
                        return;
                    }
                })               
            }
            else {
                setSignupMessageColor(red);
                releaseSignUpForm();
                let errorMessage = '';
                if (serverResponse.clientValidations != null && serverResponse.clientValidations.length !== 0) {
                    errorMessage = serverResponse.clientValidations[0];
                    setsignupMessage(errorMessage);
                    return;
                }
                if (serverResponse.serverValidations != null && serverResponse.serverValidations.length !== 0) {
                    errorMessage = serverResponse.serverValidations[0];
                    setsignupMessage(errorMessage);
                    return;
                }
            }
        });
    }
    const lockSignUpForm = ():void=>{
        //TODO
    }
    const releaseSignUpForm = ():void=>{
        //TODO
    }
    const showWaitingMessage = ():void=>{
        setSignupMessageColor(darkGreen);
        setsignupMessage(commonMessages.wait);
    }
    /*-----------------------------------------------------------------*/
    let signInBtnStyle = {
        size: '90%',
        marginTop: '10px',
        marginLeft: '5%',
        textAlign: 'center',
        height: '8%'
    }

    if (!window.matchMedia('(max-width:767px)'))
        signInBtnStyle.height = 'auto';

    return (
        <div className='signUpWhitBoxContainer'>
            <TextField
                id='signUpName'
                label='Name'
                variant='outlined'
                error={!isNameValid}
                helperText={nameErrorMessage}
                onChange={(e) => {
                    trackNameChange(e)
                }}
            />
            <TextField
                id='signUpLastName'
                label='Last name'
                variant='outlined'
                error={!isLastNameValid}
                helperText={lastNameErrorMessage}
                onChange={(e) => {
                    trackLastNameChange(e)
                }}
            />
            <TextField
                id='signUpUserName'
                label='Username'
                variant='outlined'
                error={!isUserNameValid}
                helperText={usernameErrorMessage}
                onChange={(e) => {
                    trackUserName(e);
                }}
            />

            <div className='signupRow'>
                <IntroducerSelector appIntroducers={signUpStaticInfo.appIntroducers} />
            </div>
            <FormHelperText>Who introduced English Macchiato to you?</FormHelperText>

            <div>
                <div className='signUpSelectControl'>
                    <Select id='signUpGender' variant="outlined" defaultValue={'Man'}>
                        <MenuItem value={'Man'}>Man</MenuItem>
                        <MenuItem value={'Woman'}>Woman</MenuItem>
                    </Select>
                </div>
                <div className='signUpSelectControl'>
                    <Select id='signUpProvince' variant="outlined" defaultValue={1}>
                        <MenuItem value={1}>Tehran</MenuItem>
                        <MenuItem value={2}>Khuzestan</MenuItem>
                        <MenuItem value={3}>Fars</MenuItem>
                        <MenuItem value={4}>Isfahan</MenuItem>
                        <MenuItem value={5}>Semnan</MenuItem>
                        <MenuItem value={6}>East Azarbaijan</MenuItem>
                        <MenuItem value={7}>West Azarbaijan</MenuItem>
                        <MenuItem value={8}>Ardabil</MenuItem>
                        <MenuItem value={9}>Gilan</MenuItem>
                        <MenuItem value={10}>Zanjan</MenuItem>
                        <MenuItem value={11}>Kurdistan</MenuItem>
                        <MenuItem value={12}>Kermanshah</MenuItem>
                        <MenuItem value={13}>Hamedan</MenuItem>
                        <MenuItem value={14}>Qazvin</MenuItem>
                        <MenuItem value={15}>Alborz</MenuItem>
                        <MenuItem value={16}>Mazandaran</MenuItem>
                        <MenuItem value={17}>Markazi</MenuItem>
                        <MenuItem value={18}>Qom</MenuItem>
                        <MenuItem value={19}>Lorestan</MenuItem>
                        <MenuItem value={20}>Chaharmahal</MenuItem>
                        <MenuItem value={21}>Kohgiluyeh</MenuItem>
                        <MenuItem value={22}>Bushehr</MenuItem>
                        <MenuItem value={23}>Hormozgan</MenuItem>
                        <MenuItem value={24}>Kerman</MenuItem>
                        <MenuItem value={25}>South Khorasan</MenuItem>
                        <MenuItem value={26}>Razavi Khorsan</MenuItem>
                        <MenuItem value={27}>North Khorasan</MenuItem>
                        <MenuItem value={28}>Golestan</MenuItem>
                        <MenuItem value={29}>Sistan Baluchestan</MenuItem>
                        <MenuItem value={30}>Ilam</MenuItem>
                    </Select>
                </div>
            </div>
            <TextField
                id='signUpPassword'
                label='Password'
                variant='outlined'
                type='password'
                error={!isPasswordValid}
                helperText={passwordErrorMessage}
                onChange={(e) => {
                    trackPassword(e);
                }}
            />
            <TextField
                id='signUpRepeatPassword'
                label='Repeat password'
                variant='outlined'
                type='password'
                error={!isRepeatedPasswordValid}
                helperText={repeatedPasswordErrorMessage}
                onChange={(e) => {
                    trackRepeatedPassword(e);
                }}
            />
            <div className='signupRow'>
                <div>
                    <Checkbox
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                        onChange={(e) => {
                            agrre(e)
                        }}
                    />
                </div>
                <div className='signupAgreeText' style={{ fontFamily: 'Montserrat-Regular', color: '#707070' }}>
                    I agree with&nbsp;
                </div>
                <div style={{ display: 'flex' }}>
                    <RedDashedLink text='tems and conditions' href='/termofuse' marginTop='6%' marginLeft='' />
                </div>
            </div>
            <br />

            {signupMessage && <SignUpMessage message={signupMessage} color={signupMessageColor} />}
            <SimpleBtn action={doSignup} text={'Sign up'} secondryTheme={false} simpleStyle={signInBtnStyle} />
            {isSignedUp &&
                <React.Suspense fallback={<h3>{commonMessages.loading}</h3>}>
                    {
                        /*Redirect to Global View Message*/
                        <div style={{ visibility: 'hidden' }}>
                            {
                                window.location.href = appGeneralInfo.baseUrl +
                                appGeneralInfo.mainMenuItems.homePage
                            }
                        </div>
                    }
                </React.Suspense>
            }

            <br />
            <div className='signupRow'>
                <div style={{ fontFamily: 'Montserrat-Regular', color: '#707070' }}>
                    Do you have an account?&nbsp;
                </div>
                <div>
                    <RedDashedLink text='Sign in' href='/signin' marginTop='3%' marginLeft='' />
                </div>
            </div>
        </div>
    );
}