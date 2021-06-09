
import React, { Fragment, useEffect, useState } from 'react';
import { GlobalMessageType } from '../../entity/global-message/enum/global-message-type';
import UserMessage from '../../entity/user-message/user-message';
import ErrorMessage from '../../resource/text/error-message';
import UserMessageService from '../../service/user-message-service/user-message-service';
import { appGeneralInfo } from '../../setup-general-information';
import { iso2ShortDate } from '../../util/date-util/date-util2';
import calculatePage from '../../util/page-calculator/page-calculator';
import { AuthWrapper } from '../authentication-wrapper/auth-wrapper';
import { HtmlWrapper } from '../html-wrapper/html-wrapper';
import { RowItemViewBox } from '../row-item-view/row-item-view';
import { SimpleNarrowMessage } from '../simple-narrow-message/simple-narrow-message';
import SimpleNarrowWaiting from '../simple-waiting/simple-waiting';
import WhiteRibbon from '../white-ribbon/white-ribbon';
import './css/message-detail-view.css';
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

                userMessageService.getMessage(messageId)
                .then((messageResponse) => {
                    if (messageResponse.isSuccessful) {
                        if(messageResponse.outputJson?.isRead === false){
                            userMessageService.setReadFlag(messageId);
                        }
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

        <AuthWrapper>{
            (!isReturnPageRecalculated || !backLink || !fetchedMessageData) ?
                ((!hasError) ? <SimpleNarrowWaiting /> :
                    <SimpleNarrowMessage
                        type={GlobalMessageType.Error}
                        messgae={ErrorMessage.Err0000()}
                        link={undefined}
                        linkTitle={undefined}
                    />) :
                (<RowItemViewBox
                    action={() => {
                        window.location.href =
                        backLink
                    }}>
                    { renderMessageDetail(fetchedMessageData)}
                </RowItemViewBox>)}
        </AuthWrapper>
    )
}

function renderMessageDetail(message: UserMessage): JSX.Element {
    const messageDetail = (<Fragment>
        <WhiteRibbon />
        <div id={'messageDetailContainer'}>
            <div id={'messageDetailHeader'}>
                <div className={'messageDetailHeaderRow'}>
                    <div className={'messageDetailHeaderColumn'}>
                        <b>{message.title}</b>
                    </div>
                </div>
                <div className={'messageDetailHeaderRow'}>
                    <div className={'messageDetailHeaderColumn'}>
                        <b>{'Sent by ' + message.senderId}</b>
                    </div>
                    <div className={'messageDetailHeaderColumn'}>
                        <b>{iso2ShortDate(message.sentDate as Date)}</b>
                    </div>
                </div>
            </div>
            <div id={'messageDetailTextBox'}>
                <HtmlWrapper fontFamily = {'Montserrat-Medium'}>
                    {message.text}
                </HtmlWrapper>
            </div>
        </div>
    </Fragment>);
    return messageDetail;
}