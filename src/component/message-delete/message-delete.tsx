import React, { Fragment, useEffect, useState } from 'react';


export interface IMessageDeleteViewParam
{
    messageId : string | undefined;
}
export default function MessageDeleteView(param:IMessageDeleteViewParam):JSX.Element{
    return (
        <h1>
            { ' Message Delete ' + param.messageId}
        </h1>
    )
}