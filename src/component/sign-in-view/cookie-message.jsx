import React from 'react';
import './css/cookie-message.css';
import Icon from '@material-ui/core/Icon'

export default function CookieWarningMessage() {
    const cookieWarningMessage = `Please enable the browser cookies, otherwise some features may not work properly!`;
    return (
        <React.Fragment>

            <div className='cookieWarningMessage'>              
                {cookieWarningMessage}
                <Icon style={{ color: '#D9183B'}}>warning</Icon>
            </div>

        </React.Fragment>
    )
}