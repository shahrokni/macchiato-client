import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { GlobalMessageType } from '../../entity/global-message/enum/global-message-type';
import ErrorMessage from '../../resource/text/error-message';
import SimpleBtn from '../simple-btn/simple-btn';
import { SimpleNarrowMessage } from '../simple-narrow-message/simple-narrow-message';
import SimpleNarrowWaiting from '../simple-waiting/simple-waiting';

export interface IRowItemDeletionParam {
    description: string;
    entityName: string;
    backAction: (targetPage:number) => void;
    deletionAction: () => void;
    areActionsDisabled: boolean;
    isDeletionOperationSuccessful: boolean | undefined;
}

export const RowItemDeletionBox: FunctionComponent<IRowItemDeletionParam> = (props) => {
    const [areActionsDisabled, setAreActionsDisabled] =
        useState<undefined | boolean>(undefined);
    const [isDeletionOperationSuccessful, setIsDeletionOperationSuccessful] =
        useState<undefined | boolean>(undefined);

    useEffect(() => {
        setAreActionsDisabled(props.areActionsDisabled);
        setIsDeletionOperationSuccessful(props.isDeletionOperationSuccessful);
    });

    const backBtnText = 'Back';
    const deleteBtnText = 'Delete';
    const rowItemDeletionBox = (
        <Fragment>
            <div>
                {createDeletionMessage(props.entityName)}
            </div>
            <div>
                {props.description}
            </div>
            {
                (!areActionsDisabled) ? (
                    <Fragment>
                        <SimpleBtn simpleStyle={{}} text={backBtnText}
                            action={props.backAction} />
                        <SimpleBtn simpleStyle={{}} text={deleteBtnText}
                            action={props.deletionAction} />
                    </Fragment>
                ) :
                    ((isDeletionOperationSuccessful == undefined) ? <SimpleNarrowWaiting /> :
                        <SimpleNarrowMessage
                            type={GlobalMessageType.Error}
                            messgae={ErrorMessage.Err0000()}
                            link={undefined}
                            linkTitle={undefined}
                        />
                    )

            }
        </Fragment>
    )
    return rowItemDeletionBox;
}

const createDeletionMessage = (entityName: string): string => {
    const determiner = (entityName[0].toLowerCase() === 'a' ||
        entityName[0].toLowerCase() === 'o' ||
        entityName[0].toLowerCase() === 'u' ||
        entityName[0].toLowerCase() === 'e' ||
        entityName[0].toLowerCase() === 'i') ? 'an' : 'a';
    const message = `You are going to delete ${determiner} ${entityName}
     with the following information. Are you sure you want to continue the operation?`;
    return message;
}