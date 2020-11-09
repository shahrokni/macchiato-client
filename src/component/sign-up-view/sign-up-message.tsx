import './css/sign-up-message.css';
import React from 'react';

export interface ISignUpMessage{
    message:String
    color:String
}
export const SignUpMessage = (messageParam:ISignUpMessage): JSX.Element => {
    return (
        <div className='signUpMessageContainer'>
            {messageParam.message}
        </div>
    );
}