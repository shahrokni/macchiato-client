import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { AuthenticationState } from '../../entity/global/authentication-state-novel';
import UserMessageService from '../../service/user-message-service/user-message-service';
import UserService from '../../service/user-service/user-service-novel';
import {socketNewMessageSingletone} from '../../communication/entity/socket-objects'

export const NewMessageCounter: FunctionComponent = () => {

    const [newMessageCount, setNewMessageCount] = useState<number>(0);
    const [userService] = useState<UserService>(new UserService);

    useEffect(() => {          
        socketNewMessageSingletone()
        .on('message',(data)=>{           
           setNewMessageCount(data);
        })
        userService.isUserAuthenticated()
            .then((authResponse) => {
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
        userService.isUserAuthenticated()
            .then((authResponse) => {
                if (authResponse &&
                    authResponse.isSuccessful &&
                    authResponse.outputJson === AuthenticationState.Authenticated) {   
                    if(!socketNewMessageSingletone().connected)                    
                        socketNewMessageSingletone().connect();                                                        
                }
            })
       return ()=>{
        socketNewMessageSingletone().disconnect();
       }
    });

    return (

        ((newMessageCount !== 0) ? <div className="menuRowBtnTitle newMsgCount"
            style={{ backgroundColor: '#D9183B', color: '#FFFFFF' }}>
            {newMessageCount}
        </div> : <Fragment></Fragment>)
    )
}