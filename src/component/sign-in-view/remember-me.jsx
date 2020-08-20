import React from 'react';
import './css/remember-me.css';
import Checkbox from '@material-ui/core/Checkbox';

export default class RememberMe extends React.Component {

    constructor(props) {
        super(props);
    }
    /*---------------------------------------------------*/
    render() {
        return (
            <React.Fragment>
                <div className="rememberMe">Remember Me</div>
                <Checkbox onChange={(e) => {
                    this.trackRememberMe(this.props.signinViewModel, e)
                }} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
            </React.Fragment>
        )
    }

    trackRememberMe(siginViewModel, e) {

        siginViewModel.rememberMe = e.target.checked;
    }
}