import React, { FunctionComponent } from 'react';
export interface IHtmlWrapperParam {
    fontFamily: string | undefined;
}
export const HtmlWrapper: FunctionComponent<IHtmlWrapperParam> = (props) => {
    const htmlWrapper =
        <div style={{ fontFamily: props.fontFamily }}
            dangerouslySetInnerHTML={{ __html: props.children as string }}>

        </div>
    return htmlWrapper;
}