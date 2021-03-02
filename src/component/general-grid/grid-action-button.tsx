import React, { Fragment, useState } from 'react';
import './css/grid-action-button.css';

export enum ActionType {
    view,
    update,
    delete
}

export interface IActionButtonParam {
    type: ActionType;
    viewUrl: string | undefined;
    updateUrl: string | undefined;
    deletionId: string | undefined;
}

export default function ActionButton(actionParam: IActionButtonParam): JSX.Element {


    const [actionType] = useState(actionParam.type);
    const [deletionId] = useState(actionParam.deletionId);
    const [viewUrl] = useState(actionParam.viewUrl);
    const [updateUrl] = useState(actionParam.updateUrl);

    const resolveProperAction = (actionType: ActionType):
        (inputParam: string) => void => {
        if (actionType === ActionType.view) {
            return (inputParam: string) => {
                alert(inputParam);
            }
        }
        else if (actionType === ActionType.update) {
            return (inputParam: string) => {
                alert(inputParam);
            }
        }
        else {
            return (inputParam: string) => {
                alert(inputParam);
            }
        }
    }
    return <div onClick={() => {

        const action = resolveProperAction(actionType);
        let input = '';
        switch (actionType) {
            case ActionType.delete:
                input = deletionId as string;
                break;
            case ActionType.update:
                input = updateUrl as string;
                break;
            case ActionType.view:
                input = viewUrl as string;
                break
            default:
                break;
        }
        action(input);

    }} className={'gridActionBtn ' + ActionType[actionParam.type]}>
        <div className={'gridActionBtnIcon'}>
            {
                ((): JSX.Element => {
                    let icon: JSX.Element;
                    switch (actionType) {
                        case ActionType.delete:
                            icon = <i className="material-icons absolute">{'delete'}</i>;
                            break;
                        case ActionType.update:
                            icon = <i className="material-icons absolute">{'update'}</i>;
                            break;
                        case ActionType.view:
                            icon = <i className="material-icons absolute">{'preview'}</i>;
                            break;
                        default:
                            icon = <Fragment></Fragment>
                    }
                    return icon;
                })()
            }
        </div>
        <div className={'gridActionBtnTxt'}>
            {
                ((): string => {
                    let text = '';
                    switch (actionType) {
                        case ActionType.delete:
                            text = 'Delete';
                            break;
                        case ActionType.update:
                            text = 'Update';
                            break;
                        case ActionType.view:
                            text = 'View'
                            break;
                        default: break;
                    }
                    return text;

                })()
            }
        </div>
    </div>;
}