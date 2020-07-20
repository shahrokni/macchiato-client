import React from 'react';
import './css/sign-in-message.css';
import { useState } from 'react';
import { useEffect } from 'react';

//SigninMessage React Hook
export default function SigninMessage(props) {

    const [message, setMessage] = useState('');

    useEffect(() => {
        setMessage(props.message);
    });

    if (message) {
        return (

            <div className='signinMessageBox'>
                {message}
            </div>
        )
    }
    return (
        <div className='signinMessageBox'>
            {/* LET IT BE EMPTY */}
        </div>
    )
}
