import React, { Fragment, useState } from 'react';
import { appGeneralInfo } from '../../setup-general-information';
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
    deletionUrl: string | undefined;
    gridCurrenPage: number | undefined;
}

export default function ActionButton(actionParam: IActionButtonParam): JSX.Element {


    const [actionType] = useState(actionParam.type);
    const [deletionUrl] = useState(actionParam.deletionUrl);
    const [viewUrl] = useState(actionParam.viewUrl);
    const [updateUrl] = useState(actionParam.updateUrl);

    const resolveProperAction = (actionType: ActionType):
        (inputParam: string) => void => {
        if (actionType === ActionType.view) {
            return (inputParam: string) => {
                window.location.href = appGeneralInfo.baseUrl + inputParam;
            }
        }
        else if (actionType === ActionType.update) {
            return (inputParam: string) => {
                window.location.href = appGeneralInfo.baseUrl + inputParam;
            }
        }
        else {
            return (inputParam: string) => {
                window.location.href = appGeneralInfo.baseUrl + inputParam;
            }
        }
    }
    return <div onClick={() => {

        const action = resolveProperAction(actionType);
        let input = '';
        switch (actionType) {
            case ActionType.delete:
                input = deletionUrl + '.' + actionParam.gridCurrenPage as string;
                break;
            case ActionType.update:
                input = updateUrl + '.' + actionParam.gridCurrenPage as string;
                break;
            case ActionType.view:
                input = viewUrl + '.' + actionParam.gridCurrenPage as string;
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
                            icon = <i className="material-icons absolute gridActionBtnIcon">
                                {'delete'}</i>;
                            break;
                        case ActionType.update:
                            icon = <i className="material-icons absolute gridActionBtnIcon">
                                {'update'}</i>;
                            break;
                        case ActionType.view:
                            icon = <i className="material-icons absolute gridActionBtnIcon">
                                {'preview'}</i>;
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