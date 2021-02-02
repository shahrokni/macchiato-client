import React, { useState } from 'react';
import './css/sign-up-white-box.css';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
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
import { Province } from '../../entity/global/province';
import { Gender } from '../../entity/user/gender';
import { ProvinceComponent } from '../../component/province/province';
import {GenderComponent} from '../../component/gender/gender';
/*-------------------------------*/
export const SignUpWhiteBox = (): JSX.Element => {
    const red = '#D9183B';
    const darkGreen = '#116805';
    const defaultProvince = Province.Tehran;
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
    const [isControlDisabled, setIsControlDisabled] = useState(false);
    const [isFormLocked, setIsFormLocked] = useState(false);
    const [formState, setFormState] = useState({
        name: '',
        lastName: '',
        username: '',
        password: '',
        province: defaultProvince,
        introducer: '',
        gender: Gender[Gender.Male],
        conditionAgreement: false
    });
    /*------------L O C A L F U N C T I O N S -------------------------*/

    const trackNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const newValue = e.target.value;
        setFormState({ ...formState, name: newValue });
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
        setFormState({ ...formState, lastName: newValue });
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
        setFormState({ ...formState, username: newValue });
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
    const trackIntroducer = (introducer: string): void => {
        setFormState({ ...formState, introducer: introducer });
    }
    const trackProvince = (province: string): void => {
        setFormState({ ...formState, province: province });
    }
    const trackGender = (gender: string): void => {
        setFormState({ ...formState, gender: gender });
    }
    const trackPassword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const newValue = e.target.value;
        setFormState({ ...formState, password: newValue });
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
            setFormState({ ...formState, conditionAgreement: true });
            return;
        }
        setFormState({ ...formState, conditionAgreement: false });
    }

    const doSignup = (): void => {

        if (isFormLocked === true)
            return;

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
                    userName: formState.username,
                    password: formState.password,
                    rememberMe: true
                }, (response: any) => {
                    if (response.isSuccessful === true) {
                        setIsSignedUp(true);
                        return;
                    }
                    else {
                        setSignupMessageColor(red);
                        setsignupMessage(ErrorMessage.Err0000());
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
                else {
                    setsignupMessage(ErrorMessage.Err0000());
                    return;
                }
            }
        });
    }
    const lockSignUpForm = (): void => {
        setIsFormLocked(true);
        const signupBtn = Array.from(document.getElementsByClassName('simpleBtn') as HTMLCollectionOf<HTMLElement>);
        signupBtn[0].style.cursor = 'no-drop';
        setIsControlDisabled(true);
    }
    const releaseSignUpForm = (): void => {
        setIsFormLocked(false);
        const signupBtn = Array.from(document.getElementsByClassName('simpleBtn') as HTMLCollectionOf<HTMLElement>);
        signupBtn[0].style.cursor = 'pointer';
        setIsControlDisabled(false);
    }
    const showWaitingMessage = (): void => {
        setSignupMessageColor(darkGreen);
        setsignupMessage(commonMessages.wait);
    }
    /*-----------------------------------------------------------------*/
    let signInBtnStyle = {
        size: '90%',
        marginTop: '3px',
        marginLeft: '5%',
        textAlign: 'center',
        height: '46px',
    }
    let redDashedLinkStyle = {
        fontSize: '',
        marginTop: '6%'
    }
    /* MOBILE LANDSCAPE */
    if (window.matchMedia('(max-width:767px) and (orientation: landscape)').matches) {

        redDashedLinkStyle.fontSize = '10pt';
        redDashedLinkStyle.marginTop = '8%';
    }

    return (
        <div className='signUpWhitBoxContainer'>
            <TextField
                id='signUpName'
                label='Name'
                variant='outlined'
                error={!isNameValid}
                helperText={nameErrorMessage}
                disabled={isControlDisabled}
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
                disabled={isControlDisabled}
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
                disabled={isControlDisabled}
                onChange={(e) => {
                    trackUserName(e);
                }}
            />

            <div className='signupRow'>
                <IntroducerSelector appIntroducers={null} isDisabled={isControlDisabled} changeEvent={trackIntroducer}  defaultValue={'NONE'} />
            </div>
            <FormHelperText>Who introduced English Macchiato to you?</FormHelperText>

            <div>
                <div className='signUpSelectControl'>
                    <GenderComponent id={'signUpGender'} isDisabled={isControlDisabled} onChange={trackGender} defaultValue={Gender[Gender.Male]}/>
                </div>
                <div className='signUpSelectControl'>
                    <ProvinceComponent id={'signUpProvince'} isDisabled={isControlDisabled} onChange={trackProvince} defaultValue={Province.Tehran}/>
                </div>
            </div>
            <TextField
                id='signUpPassword'
                label='Password'
                variant='outlined'
                type='password'
                error={!isPasswordValid}
                helperText={passwordErrorMessage}
                disabled={isControlDisabled}
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
                disabled={isControlDisabled}
                onChange={(e) => {
                    trackRepeatedPassword(e);
                }}
            />
            <div className='signupRow'>
                <div>
                    <Checkbox
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                        disabled={isControlDisabled}
                        onChange={(e) => {
                            agrre(e)
                        }}
                    />
                </div>
                <div className='signupAgreeText' style={{ fontFamily: 'Montserrat-Regular', color: '#707070', height: 'max-content' }}>
                    I agree with&nbsp;
                </div>
                <div style={{ display: 'flex' }}>
                    <RedDashedLink text='tems and conditions' href='/termofuse' marginTop={redDashedLinkStyle.marginTop} marginLeft='' fontSize={redDashedLinkStyle.fontSize} />
                </div>
            </div>
            <br />
            <div className='signupRow'>
                {signupMessage && <SignUpMessage message={signupMessage} color={signupMessageColor} />}
            </div>

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
                    <RedDashedLink text='Sign in' href='/signin' marginTop='3%' marginLeft='' fontSize={redDashedLinkStyle.fontSize} />
                </div>
            </div>
        </div>
    );
}