import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { AuthenticationState } from '../../entity/global/authentication-state-novel';
import { WsSubscription } from '../../entity/global/subscription';
import UserMessageService from '../../service/user-message-service/user-message-service';
import UserService from '../../service/user-service/user-service-novel';
export const NewMessageCounter: FunctionComponent = () => {

    const [newMessageCount, setNewMessageCount] = useState<number>(0);
    const [userService] = useState<UserService>(new UserService);

    useEffect(() => {
        userService.isUserAuthenticated().then((authResponse) => {
            if (authResponse &&
                authResponse.isSuccessful &&
                authResponse.outputJson === AuthenticationState.Authenticated) {

                const userMessageService = new UserMessageService();
                userMessageService.countUnreadMessages()
                    .then((unreadMessageCountResponse) => {
                        if (unreadMessageCountResponse &&
                            unreadMessageCountResponse.isSuccessful) {
                            setNewMessageCount(unreadMessageCountResponse
                                .outputJson as number)
                        }
                    });
            }
        });

    }, []);

    useEffect(() => {        
        const handleNewMessageCount = (newMessageCount: number): void => {
            setNewMessageCount(newMessageCount);
        }        
        userService.isUserAuthenticated().then((authResponse) => {
            if (authResponse &&
                authResponse.isSuccessful &&
                authResponse.outputJson === AuthenticationState.Authenticated) {
                UserMessageService.subscribe2NewMessageCount(handleNewMessageCount,
                    WsSubscription.connect)();
            }

        })
        return function clearNewMessageSubscription(): void {
            UserMessageService.
                subscribe2NewMessageCount(undefined, WsSubscription.disconnect)();
        }
    });

    return (

        ((newMessageCount !== 0) ? <div className="menuRowBtnTitle newMsgCount"
            style={{ backgroundColor: '#D9183B', color: '#FFFFFF' }}>
            {newMessageCount}
        </div> : <Fragment></Fragment>)
    )
}