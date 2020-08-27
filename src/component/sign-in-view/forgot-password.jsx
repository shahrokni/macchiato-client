import React from 'react';
import './css/forgot-password.css';
import { Link } from "react-router-dom";

export default class FrogotPassword extends React.Component {

    render() {
        return (

            <div className='forgotPasswordContainer'>
                <Link to={'/forgotpassword'} onClick={this.props.linkClick}>Forgot Password?</Link>
            </div>
        )
    }
}