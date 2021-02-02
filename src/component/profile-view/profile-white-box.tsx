import React, { Fragment, useEffect, useState } from 'react';
import './css/profile-white-box.css';
import TextField from '@material-ui/core/TextField';
import { Province } from '../../entity/global/province';
import { Gender } from '../../entity/user/gender';
import { ProvinceComponent } from '../../component/province/province';
import { GenderComponent } from '../../component/gender/gender';
import SimpleBtn from '../simple-btn/simple-btn';
import FormHelperText from '@material-ui/core/FormHelperText';
import { commonMessages } from '../../resource/text/common-messages';
import UserService from '../../service/user-service/user-service-novel';
import { UserDetail } from '../../entity/user/userDetail';
import ErrorMessage from '../../resource/text/error-message';
import { checkNameFormat, checkUserName, checkStrongPassword } from '../../util/regex/string-regex';
import SimpleNarrowWaiting from '../simple-waiting/simple-waiting';
import { SimpleNarrowMessage } from '../simple-narrow-message/simple-narrow-message';
import { IntroducerSelector } from '../introducer-selector/introducer-selector';

export default function ProfileWhiteBox(): JSX.Element {

    const red = '#D9183B';
    const darkGreen = '#116805';
    const defaultProvince = Province.Tehran;
    /*--------------------------------------*/
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [isLastNameValid, setIsLastNameValid] = useState(false);
    const [fetchedName, setFetchedName] = useState('');
    const [fetchedLastName, setFetchedLastName] = useState('');
    const [fetchedUserGender, setFetchedUserGender] = useState('');
    const [fetchedProvince, setFetchedProvince] = useState('');
    const [fetchedUserIntroducer, setFetchedUserIntroducer] = useState('');
    const [fetchedStudentNumber, setFetchedStudentNumber] = useState('');
    const [fetchedUserName, setFetchedUserName] = useState('');
    const [isNameValid, setIsNameValid] = useState(false);
    const [isControlDisabled, setIsControlDisabled] = useState(false);
    const [isComponentLoaded, setIsComponentLoaded] = useState(false);
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

    useEffect(()=>{
        const userService = new UserService();
        // userService.getUserDetail
    },[]);


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
    const trackGender = (gender: string): void => {
        setFormState({ ...formState, gender: gender });
    }
    const trackProvince = (province: string): void => {
        setFormState({ ...formState, province: province });
    }
    const trackIntroducer = (introducer: string): void => {
        setFormState({ ...formState, introducer: introducer });
    }
    return (
        <div className={'profileWhiteBoxContainer'}>
            <div className={'row'}>

                {
                    (fetchedName && fetchedStudentNumber) ?
                        <Fragment>
                            <TextField
                                id='profileUserName'
                                label='Username'
                                variant='outlined'
                                error={false}
                                helperText={''}
                                disabled={true}
                                value={fetchedUserName}
                            />
                            <TextField
                                id='profileStudentNumber'
                                label='Student number'
                                variant='outlined'
                                error={false}
                                helperText={''}
                                disabled={true}
                                value={fetchedStudentNumber}
                            />
                        </Fragment>
                        :
                        <SimpleNarrowWaiting />
                }

            </div>
            {
                (setFetchedName && fetchedLastName) ?
                    <Fragment>
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
                    </Fragment>
                    :
                    <SimpleNarrowWaiting />
            }
            {
                (fetchedUserGender) ?
                    <GenderComponent id={'profileGender'} isDisabled={isControlDisabled} onChange={trackGender} defaultValue={fetchedUserGender} />
                    :
                    <SimpleNarrowWaiting />
            }
            {
                (fetchedProvince) ?
                    <ProvinceComponent id={'profileProvince'} isDisabled={isControlDisabled} onChange={trackProvince} defaultValue={fetchedProvince} />
                    :
                    <SimpleNarrowWaiting />
            }
            {
                (fetchedUserIntroducer) ?
                    <IntroducerSelector appIntroducers={null} isDisabled={isControlDisabled} changeEvent={trackIntroducer} defaultValue={fetchedUserIntroducer} />
                    :
                    <SimpleNarrowWaiting />
            }
        </div>);
}