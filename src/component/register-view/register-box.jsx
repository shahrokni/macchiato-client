import React from 'react';
import './css/register-box.css';
import { Link } from 'react-router-dom';
import {appGeneralInfo} from '../../../src/setup-general-information';
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
                        <Link onClick={this.props.linkClick} to={'/' + appGeneralInfo.views.signup}>Sign up</Link>
                    </div>
                    <div id="registerBoxSignInBtn" className="registerBoxBtn">
                        <Link onClick={this.props.linkClick} to={'/' + appGeneralInfo.views.sigin}>Sign in</Link>
                    </div>
                </div>
            </div>
        )
    }
}