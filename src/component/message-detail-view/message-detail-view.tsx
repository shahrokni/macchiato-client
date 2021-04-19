import React, { Fragment, useEffect, useState } from 'react';
import { GlobalMessageType } from '../../entity/global-message/enum/global-message-type';
import UserMessage from '../../entity/user-message/user-message';
import ErrorMessage from '../../resource/text/error-message';
import UserMessageService from '../../service/user-message-service/user-message-service';
import { appGeneralInfo } from '../../setup-general-information';
import calculatePage from '../../util/page-calculator/page-calculator';
import { RowItemViewBox } from '../row-item-view/row-item-view';
import { SimpleNarrowMessage } from '../simple-narrow-message/simple-narrow-message';
import SimpleNarrowWaiting from '../simple-waiting/simple-waiting';
export interface IMessageDetailViewParam {
    info: string | undefined;
}
export default function MessageDetailView(param: IMessageDetailViewParam): JSX.Element {
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
        userMessageService.countListData(null).then((countResponse) => {
            if (countResponse.isSuccessful) {
                const recalculatedPage =
                    calculatePage(countResponse.outputJson as number,
                        parseInt(requestedPage));
                const createdBackLink =
                    appGeneralInfo.baseUrl +
                    appGeneralInfo.mainMenuItems.messages + '/' + recalculatedPage;
                setBackLink(createdBackLink);
                setIsReturnPageRecalculated(true);

                userMessageService.getMessage(messageId).then((messageResponse) => {
                    if (messageResponse.isSuccessful) {                        
                        setFetchedMessageData(messageResponse.outputJson);
                    }
                    else {
                        setHasError(true);
                    }
                });
            }
            else {
                setHasError(true);
            }
        })
    }, []);

    return (
        (!isReturnPageRecalculated || !backLink || !fetchedMessageData) ?
            ((!hasError) ? <SimpleNarrowWaiting /> :
                <SimpleNarrowMessage
                    type={GlobalMessageType.Error}
                    messgae={ErrorMessage.Err0000()}
                    link={undefined}
                    linkTitle={undefined}
                />) :
            (<RowItemViewBox backLink={backLink as string}>
               { renderMessageDetail(fetchedMessageData) }
            </RowItemViewBox>)
    )
}

function renderMessageDetail(message: UserMessage): JSX.Element {
    return <h1>
        {
            message.title + '\n'
            + message.text
        }
    </h1>
}