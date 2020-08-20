import React from 'react';
import { Link } from "react-router-dom";
import './css/sign-up-link.css';

export default class SignUpLink extends React.Component{

    render(){
        return (
           
            <div className="signupLinkContainer">
                <div className="sigupLinkMessage">Not a Macchiato member?</div>
                <Link to={'/signup'} onClick={this.props.linkClick}>Sign up</Link>
            </div>
        )
    }
}