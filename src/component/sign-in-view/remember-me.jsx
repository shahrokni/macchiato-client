import React from 'react';
import './css/remember-me.css';
import Checkbox from '@material-ui/core/Checkbox';

export default class RememberMe extends React.Component{
    render(){
        return (
            <React.Fragment>
                 <div className="rememberMe">Remember Me</div>
                 <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />                 
            </React.Fragment>
        )
    }
}