import React from 'react';
import './css/remember-me.css';
import Checkbox from '@material-ui/core/Checkbox';

export default class RememberMe extends React.Component{
    render(){
        return (
            <React.Fragment>
                 <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                 <div className="rememberMe">Remember Me</div>
            </React.Fragment>
        )
    }
}