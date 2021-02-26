import React from 'react';

export enum ActionType {
    view,
    update,
    delete
}

export interface IActionButtonParam {
    action: () => void;
    type: ActionType;
}

export default function ActionButton(actionParam: IActionButtonParam): JSX.Element {
    return <div onClick={() => {
        actionParam.action()
    }} className={'actionBtn ' + ActionType[actionParam.type]}>

    </div>;
}