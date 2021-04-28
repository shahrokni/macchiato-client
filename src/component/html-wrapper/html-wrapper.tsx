import React, { FunctionComponent } from 'react';
export const HtmlWrapper : FunctionComponent  = (props) =>{
    const htmlWrapper = 
     <div dangerouslySetInnerHTML={{ __html: props.children as string }}>
        
    </div>
    return htmlWrapper;
}