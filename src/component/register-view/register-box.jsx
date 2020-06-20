import React from 'react';
import './css/register-box.css';
export default class RegisterBox extends React.Component {

    render() {
        return (

            <div className="registerBox">
                <div className="registerBoxLog">
                </div>
                <div className="registerBoxSoftwareName">
                    English Macchiato
                </div>
                <div className="registerBoxSolgan">
                    Drink Your English Macchiato Now!
                </div>
                <div className="registerBoxBtnBox">
                    <div id="registerBoxSignUpBtn" className="registerBoxBtn">
                        Sign up
                    </div>
                    <div id="registerBoxSignInBtn" className="registerBoxBtn">
                        Sign in
                    </div>
                </div>
            </div>
        )
    }
}