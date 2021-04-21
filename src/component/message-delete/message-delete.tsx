import React, { Fragment, useEffect, useState } from 'react';
import { GlobalMessageType } from '../../entity/global-message/enum/global-message-type';
import UserMessage from '../../entity/user-message/user-message';
import ErrorMessage from '../../resource/text/error-message';
import UserMessageService from '../../service/user-message-service/user-message-service';
import { AuthWrapper } from '../authentication-wrapper/auth-wrapper';
import { RowItemDeletionBox } from '../row-item-deletion/row-item-deletion';
import { SimpleNarrowMessage } from '../simple-narrow-message/simple-narrow-message';
import SimpleNarrowWaiting from '../simple-waiting/simple-waiting';


export interface IMessageDeleteViewParam {
    info: string | undefined;
}
export default function MessageDeleteView(param: IMessageDeleteViewParam): JSX.Element {
    const paramArray = param.info?.split('.') as string[];
    const [messageId] = useState(paramArray[0]);
    const [requestedPage] = useState(paramArray[1]);
    const [isReturnPageRecalculated, setIsReturnPageRecalculated] = useState(false);
    const [backLink, setBackLink] = useState<string | undefined>();
    const [hasError, setHasError] = useState(false);
    const [fetchedMessageData, setFetchedMessageData] =
        useState<UserMessage | undefined>(undefined);

    useEffect(() => {
        const userMessageService = new UserMessageService();
        const messageCountPromise = userMessageService.countListData(null);
        const message = userMessageService.getMessage(messageId);
        Promise.all([messageCountPromise, message]).then((responses) => {
            const messageCountResponse = responses[0];
            const messageResponse = responses[1];
        });

    }, []);

    return (
        <AuthWrapper>
            {

                (!isReturnPageRecalculated || !backLink || !fetchedMessageData) ?
                    ((!hasError) ? <SimpleNarrowWaiting /> :
                        <SimpleNarrowMessage
                            type={GlobalMessageType.Error}
                            messgae={ErrorMessage.Err0000()}
                            link={undefined}
                            linkTitle={undefined}
                        />) :
                    (
                        <RowItemDeletionBox
                            entityName={'message'}
                            description={''} />
                    )

            }
        </AuthWrapper>
    )
}