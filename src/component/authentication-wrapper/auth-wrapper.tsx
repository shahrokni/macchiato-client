import React, { FunctionComponent, Fragment, useState, useEffect } from 'react';
import { GlobalMessageType } from '../../entity/global-message/enum/global-message-type';
import { AuthenticationState } from '../../entity/global/authentication-state-novel';
import { commonMessages } from '../../resource/text/common-messages';
import ErrorMessage from '../../resource/text/error-message';
import UserService from '../../service/user-service/user-service-novel';
import { appGeneralInfo } from '../../setup-general-information';
import { SimpleNarrowMessage } from '../simple-narrow-message/simple-narrow-message';
import SimpleNarrowWaiting from '../simple-waiting/simple-waiting';
export const AuthWrapper: FunctionComponent = (props) => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthenticationState.NotSet);
    const [hasError, setHasError] = useState<boolean>(false);
    const [loginLink] = useState(appGeneralInfo.baseUrl + appGeneralInfo.views.register);
    useEffect(() => {
        const userService = new UserService();
        userService.isUserAuthenticated().then((authResponse)=>{
            if(!authResponse.isSuccessful){
                setHasError(true);
            }
            else{
                setHasError(false);
                setIsAuthenticated(authResponse.outputJson as AuthenticationState);
            }
        })
    }, [])
    const authWrapper = (
        <Fragment>
            {
                (!hasError) ? ((isAuthenticated === AuthenticationState.NotSet) ?
                    <SimpleNarrowWaiting /> :
                    ((isAuthenticated === AuthenticationState.Authenticated) ?
                        (props.children) :
                        (<React.Suspense fallback={<h3>{commonMessages.loading}</h3>}>
                            <div style={{ visibility: 'hidden' }}>
                                {
                                    (window.location.href =
                                        loginLink)
                                }
                            </div>
                        </React.Suspense>)
                    )
                ) : (<SimpleNarrowMessage
                    type={GlobalMessageType.Error}
                    messgae={ErrorMessage.Err0000()}
                    link={undefined}
                    linkTitle={undefined}
                />)
            }
        </Fragment>);
    return authWrapper;
}