import React, { Fragment, FunctionComponent } from 'react';
import SimpleBtn from '../simple-btn/simple-btn';

export interface IRowItemDeletionParam {
    description: string;
    entityName: string;
    backAction: () => void;
    deletionAction: () => void;
}

export const RowItemDeletionBox: FunctionComponent<IRowItemDeletionParam> = (props) => {
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
            <SimpleBtn simpleStyle={{}} text={backBtnText}
                action={props.backAction} />
            <SimpleBtn simpleStyle={{}} text={deleteBtnText}
                action={props.deletionAction} />
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