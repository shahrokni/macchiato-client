import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';
import UserMessageService from '../../service/user-message-service/user-message-service';
export const NewMessageCounter: FunctionComponent = () => {

    const [newMessageCount, setNewMessageCount] = useState<number>(0);

    useEffect(() => {
        const userMessageService = new UserMessageService();
        userMessageService.countUnreadMessages()
            .then((unreadMessageCountResponse) => {
                if (unreadMessageCountResponse && unreadMessageCountResponse.isSuccessful) {
                    setNewMessageCount(unreadMessageCountResponse.outputJson as number)
                }
            })

    }, []);

    useEffect(() => {
        const handleNewMessageCount = (newMessageCount: number): void => {
            setNewMessageCount(newMessageCount);
        }
        UserMessageService.subscribe2NewMessageCount(handleNewMessageCount);
        return function clearNewMessageSubscription(): void {

        }
    })
    return (

        ((newMessageCount !== 0) ? <div className="menuRowBtnTitle newMsgCount"
            style={{ backgroundColor: '#D9183B', color: '#FFFFFF' }}>
            {newMessageCount}
        </div> : <Fragment></Fragment>)
    )
}