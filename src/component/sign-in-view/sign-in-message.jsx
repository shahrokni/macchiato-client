import React from 'react';
import './css/sign-in-message.css';


//SigninMessage React Hook
export default function SigninMessage(props) {

    return (

        <div ref={props.messageRef} className='signinMessageBox'>

        </div>
    )

}
