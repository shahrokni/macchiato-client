import React, { Fragment, useEffect, useState } from 'react';
import './css/profile-white-box.css';
import TextField from '@material-ui/core/TextField';
import { Province } from '../../entity/global/province';
import { Gender } from '../../entity/user/gender';
import { ProvinceComponent } from '../../component/province/province';
import { GenderComponent } from '../../component/gender/gender';
import SimpleBtn from '../simple-btn/simple-btn';
import { commonMessages } from '../../resource/text/common-messages';
import UserService from '../../service/user-service/user-service-novel';
import ErrorMessage from '../../resource/text/error-message';
import { checkNameFormat } from '../../util/regex/string-regex';
import SimpleNarrowWaiting from '../simple-waiting/simple-waiting';
import { SimpleNarrowMessage } from '../simple-narrow-message/simple-narrow-message';
import { IntroducerSelector } from '../introducer-selector/introducer-selector';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { UserDetail } from '../../entity/user/userDetail';
import systemMessages from '../../resource/text/system-message';

export default function ProfileWhiteBox(): JSX.Element {

    const red = '#D9183B';
    const darkGreen = '#116805';
    const btnId = 'updateUserInformationBtn';
    const btnText = 'update';
    const defaultProvince = Province.Tehran;
    interface IFormState {
        name: string;
        lastName: string;
        province: string;
        introducer: string;
        gender: Gender | string;
        birthDate: Date | null;
    }
    /*--------------------------------------*/
    const [fetchedName, setFetchedName] = useState('');
    const [fetchedLastName, setFetchedLastName] = useState('');
    const [fetchedUserGender, setFetchedUserGender] = useState('');
    const [fetchedProvince, setFetchedProvince] = useState('');
    const [fetchedUserIntroducer, setFetchedUserIntroducer] = useState('');
    const [fetchedStudentNumber, setFetchedStudentNumber] = useState('');
    const [fetchedUserName, setFetchedUserName] = useState('');
    const [fetchedBirthDate, setFetchedBirthDate] = useState<Date | null>(null);
    const [isBirthDateValid, setIsBirthDateValid] = useState(false);
    const [birthDateErrorMessage, setBirthDateErrorMessage] = useState('');
    const [isNameValid, setIsNameValid] = useState(false);
    const [isLastNameValid, setIsLastNameValid] = useState(false);
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [isControlDisabled, setIsControlDisabled] = useState(false);
    const [isOperationLocked, setIsOperationLocked] = useState(false);
    const [isComponentLoaded, setIsComponentLoaded] = useState(false);
    const [status, setStatus] = useState('');
    const [statusColor, setStatusColor] = useState(darkGreen);
    const [formState, setFormState] = useState<IFormState>({
        name: '',
        lastName: '',
        province: defaultProvince,
        introducer: '',
        gender: Gender[Gender.Male],
        birthDate: null
    });

    /* DESKTOP */
    const updateBtnStyle = {
        size: '100%',
        marginTop: '0',
        textAlign: 'center',
        height: '3.125rem'
    }

    useEffect(() => {
        const userService = new UserService();
        userService.getUserJoinedDetail().then((response) => {
            if (response && response.isSuccessful && response.outputJson) {


                setFormState({
                    ...formState,
                    name: response.outputJson.name,
                    lastName: response.outputJson.lastName,
                    gender: response.outputJson.gender,
                    province: response.outputJson.province,
                    introducer: response.outputJson.introducerCode,
                    birthDate: response.outputJson.birthDate
                });
                setFetchedName(response.outputJson.name);
                (!checkNameFormat(response.outputJson.name)) ? setIsNameValid(false) : setIsNameValid(true);
                (!checkNameFormat(response.outputJson.name)) && setNameErrorMessage(ErrorMessage.ErrBu0026());

                setFetchedLastName(response.outputJson.lastName);
                (!checkNameFormat(response.outputJson.lastName)) ? setIsLastNameValid(false) : setIsLastNameValid(true);
                (!checkNameFormat(response.outputJson.lastName)) && setLastNameErrorMessage(ErrorMessage.ErrBu0027());

                setFetchedBirthDate(response.outputJson.birthDate);
                (!response.outputJson.birthDate) ? setIsBirthDateValid(false) : setIsBirthDateValid(true);
                (!response.outputJson.birthDate) && setBirthDateErrorMessage(ErrorMessage.ErrBu0007());

                setFetchedStudentNumber(response.outputJson.studentNumber);
                setFetchedUserName(response.outputJson.userName);
                setFetchedUserGender(response.outputJson.gender as string);
                setFetchedProvince(response.outputJson.province);
                setFetchedUserIntroducer(response.outputJson.introducerCode);

                setIsComponentLoaded(true);
            }
            else {
                setIsComponentLoaded(false);
                setStatusColor(red);
                if (response.clientValidations && response.clientValidations.length != 0) {
                    setStatus(response.clientValidations[0].toString());
                    return;
                }
                else if (response.serverValidations && response.serverValidations.length != 0) {
                    setStatus(response.serverValidations[0].toString());
                    return;
                }
                else {
                    setStatus(ErrorMessage.Err0000());
                }
            }
        })
    }, []);


    const trackNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const newValue = e.target.value;
        setFetchedName(newValue);
        setFormState({ ...formState, name: newValue });
        const isValid = checkNameFormat(newValue);
        if (!isValid) {
            setIsNameValid(false);
            setNameErrorMessage(ErrorMessage.ErrBu0026());
        }
        else {
            setIsNameValid(true);
            setNameErrorMessage('');
        }
    }

    const trackLastNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const newValue = e.target.value;
        setFetchedLastName(newValue);
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

    const trackGender = (gender: string): void => {
        setFetchedUserGender(gender);
        setFormState({ ...formState, gender: gender });
    }

    const trackProvince = (province: string): void => {
        setFetchedProvince(province);
        setFormState({ ...formState, province: province });
    }

    const trackIntroducer = (introducer: string): void => {
        setFetchedUserIntroducer(introducer);
        setFormState({ ...formState, introducer: introducer });
    }

    const trackBirthDate = (date: Date | null) => {
        setFetchedBirthDate(date);
        setFormState({ ...formState, birthDate: date as Date });
        if (date) {
            setIsBirthDateValid(true);
        }
    }

    const manageForm = (isLocked: boolean): () => void => {
        const cursor = (!isLocked) ? 'pointer' : 'no-drop';
        return () => {
            (isLocked) ? setIsControlDisabled(true) : setIsControlDisabled(false);
            (isLocked) ? setIsOperationLocked(true) : setIsOperationLocked(false);
            const updateBtn = document.getElementById(btnId);
            (updateBtn) && (updateBtn.style.cursor = cursor);
        }
    }

    const updateUserInformation = (): void => {

        if (isOperationLocked || !isComponentLoaded)
            return;
        setStatusColor(darkGreen);
        setStatus(commonMessages.wait);
        (manageForm(true))();

        const userDetailData = new UserDetail();
        userDetailData.name = formState.name;
        userDetailData.lastName = formState.lastName;
        userDetailData.birthDate = formState.birthDate;
        userDetailData.gender = formState.gender;
        userDetailData.province = formState.province;
        userDetailData.introducerCode = formState.introducer;
        const userService = new UserService();       
        userService.updateUserInformation(userDetailData)
            .then((response) => {                
                if (response && response.isSuccessful && response.outputJson) {
                    const userDetail = response.outputJson as UserDetail;
                    setStatusColor(darkGreen);
                    setFetchedStudentNumber(userDetail.studentNumber);
                    setFetchedUserName(userDetail.userName);
                    setFetchedName(userDetail.name);
                    setFetchedLastName(userDetail.lastName);
                    setFetchedProvince(userDetail.province);
                    setFetchedUserGender(userDetail.gender as string);
                    setFetchedUserIntroducer(userDetail.introducerCode);
                    setStatus(systemMessages.userInformationUpdate);
                    setStatusColor(darkGreen);
                }
                else {
                    setStatusColor(red);
                    if (response.serverValidations.length > 0) {
                        setStatus(response.serverValidations[0].toString());
                    }
                    else if (response.clientValidations.length > 0) {
                        setStatus(response.clientValidations[0].toString());
                    }
                    else {
                        setStatus(ErrorMessage.Err0000());
                    }
                    (manageForm(false))();
                }
            })

    }

    return (
        <div className={'profileWhiteBoxContainer'}>
            {
                (fetchedName && fetchedStudentNumber) ?
                    <Fragment>
                        <div className={'profileWhiteBoxRow'}>
                            <TextField
                                id='profileUserName'
                                label='Username'
                                variant='outlined'
                                error={false}
                                helperText={''}
                                disabled={true}
                                value={fetchedUserName}
                            />
                        </div>
                        <div className={'profileWhiteBoxRow'}>
                            <TextField
                                id='profileStudentNumber'
                                label='Student number'
                                variant='outlined'
                                error={false}
                                helperText={''}
                                disabled={true}
                                value={fetchedStudentNumber}
                            />
                        </div>
                    </Fragment>
                    :
                    <SimpleNarrowWaiting />
            }
            {
                (fetchedName && fetchedLastName) ?
                    <Fragment>
                        <div className={'profileWhiteBoxRow'}>
                            <TextField
                                id='profileName'
                                label='Name'
                                variant='outlined'
                                error={!isNameValid}
                                helperText={nameErrorMessage}
                                disabled={isControlDisabled}
                                onChange={(e) => {
                                    trackNameChange(e)
                                }}
                                value={fetchedName}
                            />
                        </div>
                        <div className={'profileWhiteBoxRow'}>
                            <TextField
                                id='profileLastName'
                                label='Last name'
                                variant='outlined'
                                error={!isLastNameValid}
                                helperText={lastNameErrorMessage}
                                disabled={isControlDisabled}
                                onChange={(e) => {
                                    trackLastNameChange(e)
                                }}
                                value={fetchedLastName}
                            />
                        </div>
                    </Fragment>
                    :
                    <SimpleNarrowWaiting />
            }
            {
                (fetchedUserGender) ?
                    <div className='profileWhiteBoxRow'>
                        <GenderComponent id={'profileGender'} isDisabled={isControlDisabled} onChange={trackGender} defaultValue={fetchedUserGender} />
                    </div>
                    :
                    <SimpleNarrowWaiting />
            }
            {
                (fetchedProvince) ?
                    <div className='profileWhiteBoxRow'>
                        <ProvinceComponent id={'profileProvince'} isDisabled={isControlDisabled} onChange={trackProvince} defaultValue={fetchedProvince} />
                    </div>
                    :
                    <SimpleNarrowWaiting />
            }
            {
                (fetchedUserIntroducer) ?
                    <div className='profileWhiteBoxRow'>
                        <IntroducerSelector appIntroducers={null} isDisabled={isControlDisabled} changeEvent={trackIntroducer} defaultValue={fetchedUserIntroducer} />
                    </div>
                    :
                    <SimpleNarrowWaiting />
            }
            {
                (isComponentLoaded) ?
                    <div className={'profileWhiteBoxRow'}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="profileBirthDate"
                                    label="Birth date"
                                    error={!isBirthDateValid}
                                    helperText={!isBirthDateValid ? birthDateErrorMessage : ''}
                                    value={(!fetchedBirthDate) ? null : fetchedBirthDate}
                                    disabled={isControlDisabled}
                                    onChange={trackBirthDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>
                    :
                    <SimpleNarrowWaiting />
            }
            {
                <Fragment>
                    <SimpleBtn text={btnText} simpleStyle={updateBtnStyle} action={updateUserInformation} id={btnId} />
                    <div className={'row'}>
                        <div className={'userInformationStatusMessage'} style={{ color: statusColor }}>
                            {status}
                        </div>
                    </div>
                </Fragment>
            }
        </div>);
}