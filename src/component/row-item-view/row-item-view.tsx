import React, { Fragment, useEffect, useState, FunctionComponent } from 'react';
import SimpleBtn from '../simple-btn/simple-btn';

export interface RowItemViewParam {
    backLink: string;
}


export const RowItemViewBox:
    FunctionComponent<RowItemViewParam> = (props) => {
        const backText = 'Back';
        const rowItemViewParam = 
         <Fragment>
             {props.children}
             <SimpleBtn text = {backText} />
        </Fragment>
        return rowItemViewParam
    }