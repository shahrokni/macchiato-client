import React, { useEffect, useState } from 'react';
import { checkCellphone } from '../../util/regex/string-regex';
import { commonMessages } from '../../resource/text/common-messages';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from '../../resource/text/error-message';
import UserService from '../../service/user-service/user-service-novel';
import SimpleBtn from '../simple-btn/simple-btn';
import { UserDetail } from '../../entity/user/userDetail';
import systemMessages from '../../resource/text/system-message';
import './css/cellphone.css';
export const Cellphone = (): JSX.Element => {

    const saveBtn = 'Save';
    const update = 'Update';
    const red = '#D9183B';
    const darkGreen = '#116805';
    const btnId = 'updateCellphoneBtn';

    const [cellphone, setCellphone] = useState('');
    const [status, setStatus] = useState(commonMessages.loading);
    const [statusColor, setStatusColor] = useState(darkGreen);
    const [isDataReady, setIsDataReady] = useState(false);
    const [isComponentLoaded, setIsComponentLoaded] = useState(false);
    const [isCellphoneValid, setIsCellphoneValid] = useState(false);
    const [btnText, setBtnTxt] = useState(commonMessages.loading);
    const [isLocked, setIsLocked] = useState(false);
    const [cellphoneTxtControlEnable, setEmailTxtControlEnable] = useState(true);

    useEffect(() => {
        const userService = new UserService();
        userService.getCellphone().then((response) => {

            if (response && response.isSuccessful) {
                const fetchedCellphone = response.outputJson as string;
                setIsDataReady(true);
                setIsComponentLoaded(true);
                (!fetchedCellphone) ? setBtnTxt(saveBtn) : setBtnTxt(update);
                (fetchedCellphone) && (setCellphone(fetchedCellphone));
                (!fetchedCellphone) ? setIsCellphoneValid(false) : setIsCellphoneValid(true);
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

        });
    }, []);


    const trackCellphoneChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const newCellphoneValue = e.target.value;
        setCellphone(newCellphoneValue);
        setIsCellphoneValid(checkCellphone(newCellphoneValue));
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

    const updateCellphone = (): any => {

        if (isLocked === true || !isComponentLoaded)
            return;

        setStatusColor(darkGreen);
        setStatus(commonMessages.wait);
        (manageForm(true))();
        const userService = new UserService();
        userService.updateCellphone(cellphone)
            .then((response) => {

                if (response.isSuccessful) {
                    const userDetail = response.outputJson as UserDetail;
                    setCellphone((userDetail as UserDetail).cellphone);
                    setStatus(systemMessages.cellphoneUpdate);
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
    const updateCellphoneBtn = {
        size: '27%',
        marginTop: '0',
        marginLeft: '5%',
        textAlign: 'center',
        height: '3.125rem'
    }


    return (
        <div className={'cellphoneContainer'}>
            <div className={'row cellphoneRow'}>
                <TextField
                    id='cellphone'
                    label='cellphone'
                    variant='outlined'
                    error={!isCellphoneValid}
                    helperText={(!isCellphoneValid) ? ErrorMessage.ErrBu0011() : ''}
                    value={(isDataReady && cellphone) ? cellphone : ''}
                    disabled={!cellphoneTxtControlEnable}
                    onChange={(e) => {
                        trackCellphoneChange(e)
                    }}
                />
                <SimpleBtn id={btnId} text={btnText} action={updateCellphone} simpleStyle={updateCellphoneBtn} />
            </div>
            <div className={'row cellphoneRow'}>
                <div className={'cellphoneStatusMessage'} style={{ color: statusColor }}>
                    {status}
                </div>
            </div>
        </div>
    );
}