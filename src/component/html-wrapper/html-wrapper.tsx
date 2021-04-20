import React, { FunctionComponent } from 'react';
export const HtmlWrapper : FunctionComponent  = (props) =>{
    return <div>
        {props.children}
    </div>
}