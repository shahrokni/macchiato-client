import './css/sign-up-message.css';
import React from 'react';
export interface ISignUpMessage {
    message: String
    color: string
}
export const SignUpMessage = (messageParam: ISignUpMessage): JSX.Element => {
    return (
        <div className='signUpMessageContainer' style={{color:messageParam.color}}>            
                {messageParam.message}           
        </div>
    );
}

