import React, { useEffect, useState } from 'react';
import { GlobalMessageType } from '../../entity/global-message/enum/global-message-type';
import UserMessage from '../../entity/user-message/user-message';
import ErrorMessage from '../../resource/text/error-message';
import UserMessageService from '../../service/user-message-service/user-message-service';
import { appGeneralInfo } from '../../setup-general-information';
import calculatePage from '../../util/page-calculator/page-calculator';
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
    const [hasError, setHasError] = useState(false);
    const [fetchedMessageData, setFetchedMessageData] =
        useState<UserMessage | undefined>(undefined);
    const [isOperationLocked, setIsOperationLocked] = useState(false);
    const [isOperationSuccessful, setIsOperationSucessful] =
        useState<boolean | undefined>(undefined);

    useEffect(() => {
        const userMessageService = new UserMessageService();
        userMessageService.getMessage(messageId)
            .then((messageResponse) => {
                if (!messageResponse.isSuccessful) {
                    setHasError(true);
                }
                else {
                    setFetchedMessageData(messageResponse.outputJson);
                    setHasError(false);
                }
            })
    }, []);

    const back = () => {
        window.location.href =
            appGeneralInfo.baseUrl +
            appGeneralInfo.mainMenuItems.messages +
            '/' + requestedPage;
    }

    const deleteItem = () => {
        setIsOperationLocked(true);
        const userMessageService = new UserMessageService();
        userMessageService.deleteMessage(messageId)
            .then((deletionResponse) => {
                if (deletionResponse.isSuccessful === true) {
                    userMessageService.countListData(null)
                        .then((countResponse) => {
                            const countMesages = countResponse.outputJson as number;
                            const calculatedPageNumber =
                                calculatePage(countMesages, parseInt(requestedPage));                           
                                window.location.href =
                                appGeneralInfo.baseUrl +
                                appGeneralInfo.mainMenuItems.messages +
                                '/' + calculatedPageNumber;
                        })
                }
                else {
                    setIsOperationSucessful(false);
                }
            })
    }

    return (
        <AuthWrapper>
            {

                (!fetchedMessageData) ?
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
                            description={fetchedMessageData.title as string}
                            backAction={back}
                            deletionAction={deleteItem}
                            areActionsDisabled={isOperationLocked}
                            isDeletionOperationSuccessful={isOperationSuccessful}
                        />
                    )

            }
        </AuthWrapper>
    )
}

