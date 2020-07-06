import React from 'react';
import './css/sign-in-logo.css';
export default class SignInLogo extends React.Component {

    render() {
        return (

            <div className="signInLogoBox">
                <div className="signInLogoPicture">

                </div>
                <div className="signInTitleBox">
                    <div className="signInSoftwareName">English Macchiato</div>
                    <div className="signInSoftwareSlogan">Drink Your English Macchiato Now!</div>
                </div>
            </div>
        )
    }
}