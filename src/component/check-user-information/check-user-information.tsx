import React, { useEffect, useState } from 'react';
import './css/check-user-information.css';
import { commonMessages } from '../../resource/text/common-messages';
import { appGeneralInfo } from '../../setup-general-information';
import { getCookieByKey, removeCookieByKey } from '../../util/cookie-util/cookie-util';
import UserService from '../../service/user-service/user-service';

export default function CheckUserInformation() {

    let destinationLink = '';
    const checkUserInfoMessag = 'The user information is being checked. Please be patient...';
    const [showLoadingMessage, setShowLoadingMessage] = useState(true);
    /* FUNCTIONS */
    const isAuthKeyValid = async (): Promise<boolean> => {
        const authKey = getAuthKey();
        return new Promise((resolve, reject) => {
            const userService = new UserService();
            userService.signinWithAuthKey(authKey, (response: any) => {
                if (response) {
                    (response.isSuccessful === true)
                        ? resolve(true)
                        : resolve(false);
                }
                else {
                    resolve(false)
                }
            });
        })
    }

    const getAuthKey = (): string => {

        const authKey = getCookieByKey('authKey');
        return authKey;
    }

    const removeAuthKeyCookie = (): void => {
        removeCookieByKey('authKey');
    }

    useEffect(() => {

        isAuthKeyValid()
            .then((isValid) => {
                if (isValid === true) {
                    /* GET USER INFORMATION */
                    const userService = new UserService();
                    userService.getUserDetail((response: any) => {
                        window.sessionStorage.setItem('userName', response.outputJson.userDetail.name);
                        window.sessionStorage.setItem('userLastName', response.outputJson.userDetail.lastName);
                        destinationLink = appGeneralInfo.baseUrl + appGeneralInfo.mainMenuItems.homePage;
                        setShowLoadingMessage(false);
                        return;
                    });
                }
                else {
                    removeAuthKeyCookie();
                    destinationLink = appGeneralInfo.baseUrl + appGeneralInfo.views.sigin;
                    setShowLoadingMessage(false);
                    return;
                }
            })
    })

    return (
        <React.Fragment>
            {
                (showLoadingMessage === true) ? (
                    <div className='checkUserInfromation'>
                        {checkUserInfoMessag}
                        <span className="material-icons hourglass">
                            hourglass_bottom
                        </span>
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
    );
}

