import React, { FunctionComponent, useState } from 'react';
import './css/menu-row-btn.css';
import { Link } from "react-router-dom";
export interface IMenueRowBtnParams {
    icon: string;
    name: string;
    title: string;
    menuRowBtnEventHandler: () => void;
}

export const MenuRowBtn: FunctionComponent<IMenueRowBtnParams> = (params) => {
    return (
        <div className="menuRowBtn">
            <div className="menuRowBtnIcon">
                <i className="material-icons-outlined">{params.icon}</i>
            </div>
            <div className="menuRowBtnTitle" id={params.name}
                onClick={params.menuRowBtnEventHandler}>
                <Link to={'/' + params.name}>{params.title}</Link>
            </div>
            {
                params.children
            }

        </div>
    );

}