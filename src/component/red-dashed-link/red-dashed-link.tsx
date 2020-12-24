import React from 'react';
import './css/red-dashed-link.css';
/*---- I N T E R F A C E----*/
export interface IRedDashedLink {
    href: string;
    text: string | null;
    marginLeft: string | null;
    marginTop: string | null;
    fontSize: string | null;    
}
/*--------------------------*/
export const RedDashedLink = (redDashedLinkInfo: IRedDashedLink): JSX.Element => {

    let inlineStyle: { [k: string]: any } = {};
    inlineStyle.height = 'max-content';

    if (redDashedLinkInfo.marginLeft)
        inlineStyle.marginLeft = redDashedLinkInfo.marginLeft;
    if (redDashedLinkInfo.marginTop)
        inlineStyle.marginTop = redDashedLinkInfo.marginTop;
    if(redDashedLinkInfo.fontSize)
        inlineStyle.fontSize = redDashedLinkInfo.fontSize;
    


    return (
        <a className='redDashedLink' href={redDashedLinkInfo.href}
            style={{ ...inlineStyle }}>
            {redDashedLinkInfo.text}
        </a>
    );
}