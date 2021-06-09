import React, { Fragment, useEffect, useState, FunctionComponent } from 'react';
import SimpleBtn from '../simple-btn/simple-btn';

export interface IRowItemViewParam {   
    action:()=>void;
}

export const RowItemViewBox:
    FunctionComponent<IRowItemViewParam> = (props) => {
        const backBtnText = 'Back';
        const rowItemViewParam = 
         <Fragment>
             {props.children}
             <SimpleBtn text = {backBtnText} simpleStyle = {{}} action={props.action} />
        </Fragment>
        return rowItemViewParam
    }