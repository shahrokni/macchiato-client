import React, { useEffect, useState } from 'react';
import './css/check-user-information.css';
import { appGeneralInfo } from '../../setup-general-information';
import { getCookieByKey, removeCookieByKey } from '../../util/cookie-util/cookie-util';
import UserService from '../../service/user-service/user-service';

export default function CheckUserInformation() {

    let destinationLink = '';
    const timeout = 1000;
    const checkUserInfoMessag = 'The user information is being checked. Please be patient...';
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

    const removeAuthKeyCookie = async (): Promise<void> => {
        return new Promise((resolve, reject) => {
            removeCookieByKey('authKey');
            resolve();
        });
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
                        setTimeout(() => {
                            destinationLink = appGeneralInfo.baseUrl + appGeneralInfo.mainMenuItems.homePage;
                            document.location.href = destinationLink;
                        }, timeout);
                        return;
                    });
                }
                else {
                    removeAuthKeyCookie().then(() => {
                        setTimeout(() => {
                            destinationLink = appGeneralInfo.baseUrl + appGeneralInfo.views.sigin;
                            document.location.href = destinationLink;
                        }, timeout);

                    });
                    return;
                }
            })
            .catch((ex) => {

            })
    })

    return (
        <React.Fragment>
            {

                <div className='checkUserInfromation'>
                    {checkUserInfoMessag}
                    <span style={{ color: '#116805' }} className="material-icons hourglass">
                        hourglass_bottom
                    </span>
                </div>
            }
        </React.Fragment>
    );
}

