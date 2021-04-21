import React, { Fragment, useEffect, useState, FunctionComponent } from 'react';
import SimpleBtn from '../simple-btn/simple-btn';

export interface RowItemViewParam {
    backLink: string;
    action:()=>void;
}

export const RowItemViewBox:
    FunctionComponent<RowItemViewParam> = (props) => {
        const backText = 'Back';
        const rowItemViewParam = 
         <Fragment>
             {props.children}
             <SimpleBtn text = {backText} simpleStyle = {{}} action={props.action} />
        </Fragment>
        return rowItemViewParam
    }