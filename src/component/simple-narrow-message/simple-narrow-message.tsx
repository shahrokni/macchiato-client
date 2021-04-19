import React from 'react';
import { GlobalMessageType } from '../../entity/global-message/enum/global-message-type';
export interface ISimpleNarrowMessage {
    messgae: string;
    link: string | undefined;
    linkTitle: string | undefined;
    type: GlobalMessageType;
}
export const SimpleNarrowMessage = (simpleNarrowMessage: ISimpleNarrowMessage): JSX.Element => {
    return (
        <div>
            <div>
                {simpleNarrowMessage.messgae}
            </div>
            {(simpleNarrowMessage.link) && <a href={simpleNarrowMessage.link}>
                {(simpleNarrowMessage.linkTitle) ? (simpleNarrowMessage.linkTitle) : (simpleNarrowMessage.link)}
            </a>}
        </div>
    )
}