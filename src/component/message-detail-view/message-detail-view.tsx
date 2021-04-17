import React, { Fragment, useEffect, useState } from 'react';


export interface IMessageDetailViewParam
{
    messageId : string | undefined;
}
export default function MessageDetailView(param:IMessageDetailViewParam):JSX.Element{
    return (
        <h1>
            { ' Message Detail ' + param.messageId}
        </h1>
    )
}