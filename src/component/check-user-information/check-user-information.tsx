import React, { useEffect, useState } from 'react';
import './css/check-user-information.css';
import { commonMessages } from '../../resource/text/common-messages';
import { appGeneralInfo } from '../../setup-general-information';
import { getCookieByKey, removeCookieByKey } from '../../util/cookie-util/cookie-util';

export default function CheckUserInformation() {

    const checkUserInfoMessag = 'The user information is being checked. Please be patient...';
    const [showLoadingMessage, setShowLoadingMessage] = useState(true);
    let destinationLink = '';

    useEffect(() => {
        alert(getCookieByKey('authKey'));
    })

    return (
        <React.Fragment>

            {
                (showLoadingMessage === true) ? (
                    <div className='checkUserInfromation'>
                        {checkUserInfoMessag}
                    </div>) : (
                        <React.Suspense fallback={<h3>{commonMessages.loading}</h3>}>
                            <div style={{ visibility: 'hidden' }}>
                                {
                                    (window.location.href = destinationLink)
                                }
                            </div>
                        </React.Suspense>
                    )
            }
        </React.Fragment>
    )
}

const getAuthKey = (): string => {

    const authKey = getCookieByKey('authKey');
    return authKey;
}

const isAuthKeyValid = async (): Promise<boolean> => {
    const authKey = getAuthKey();
    /* SERVICE CALL */
    return Promise.resolve(true);
}

const removeAuthKeyCookie = (): void => {
    removeCookieByKey('authKey');
}