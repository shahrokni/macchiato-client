import React, { useEffect, useState } from 'react';
import { checkEmailFormat } from '../../util/regex/string-regex';
import { commonMessages } from '../../resource/text/common-messages';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from '../../resource/text/error-message';
import UserService from '../../service/user-service/user-service-novel';
import SimpleBtn from '../simple-btn/simple-btn';
import { UserDetail } from '../../entity/user/userDetail';
import systemMessages from '../../resource/text/system-message';
import './css/email.css';

export const Email = (): JSX.Element => {

    const saveBtn = 'Save';
    const update = 'Update';
    const red = '#D9183B';
    const darkGreen = '#116805';
    const btnId = 'updateEmailBtn';

    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(commonMessages.loading);
    const [statusColor, setStatusColor] = useState(darkGreen);
    const [isDataReady, setIsDataReady] = useState(false);
    const [isComponentLoaded, setIsComponentLoaded] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [btnText, setBtnTxt] = useState(commonMessages.loading);
    const [isLocked, setIsLocked] = useState(false);
    const [emailTxtControlEnable, setEmailTxtControlEnable] = useState(true);

    useEffect(() => {
        const userService = new UserService();
        userService.getEmail().then((response) => {
            if (response && response.isSuccessful) {
                const fetchedEmail = response.outputJson as string;
                setIsDataReady(true);
                setIsComponentLoaded(true);
                (!fetchedEmail) ? setBtnTxt(saveBtn) : setBtnTxt(update);
                (!fetchedEmail) ? setEmail('') : setEmail(fetchedEmail);
                (!fetchedEmail) ? setIsEmailValid(false) : setIsEmailValid(true);
                setStatus('');
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

    const trackEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const newEmailValue = e.target.value;
        setEmail(newEmailValue);
        setIsEmailValid(checkEmailFormat(newEmailValue));
    }

    const manageForm = (isLocked: boolean): () => void => {

        const cursor = (!isLocked) ? 'pointer' : 'no-drop';
        setEmailTxtControlEnable(!isLocked);
        return () => {
            (!isLocked) ? setIsLocked(false) : setIsLocked(true);
            const updateBtn = document.getElementById(btnId);
            (updateBtn) && (updateBtn.style.cursor = cursor);
        }

    }

    const updateEmail = (): any => {

        if (isLocked === true || !isComponentLoaded)
            return;

        setStatusColor(darkGreen);
        setStatus(commonMessages.wait);
        (manageForm(true))();
        const userService = new UserService();
        userService.updateEmail(email)
            .then((response) => {                
                if (response.isSuccessful) {
                    const userDetail = response.outputJson as UserDetail;
                    setEmail((userDetail as UserDetail).email);
                    setStatus(systemMessages.emailUpdate);
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
            });
    }

    /* DESKTOP */
    const updateEmailBtn = {
        size: '27%',
        marginTop: '0',
        marginLeft: '5%',
        textAlign: 'center',
        height: '3.125rem'
    }

    return (
        <div className={'emailContainer'}>
            <div className={'row emailRow'}>
                <TextField
                    id='email'
                    label={'email'}
                    variant='outlined'
                    error={!isEmailValid}
                    helperText={(!isEmailValid) ? ErrorMessage.ErrBu0003() : ''}
                    value={(isDataReady && email) ? email : ''}
                    disabled={!emailTxtControlEnable}
                    onChange={(e) => {
                        trackEmailChange(e)
                    }}
                />
                <SimpleBtn id={btnId} text={btnText} action={updateEmail} simpleStyle={updateEmailBtn} />
            </div>
            <div className={'row'}>
                <div className={'emailStatusMessage'} style={{ color: statusColor }}>
                    {status}
                </div>
            </div>
        </div>
    );

}