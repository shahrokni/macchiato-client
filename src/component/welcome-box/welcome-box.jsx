import React from 'react';
import './css/welcome-box.css';
import store from '../../util/state-management-handler/store';

export default class WelcomeBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const defaultWelcomeMessage = 'Welcome to English Macchiato!'
        return (
            <div className="welcomeBox">
                {(store.getState().currentUser) ?
                    'Welcome ' + store.getState().currentUser.name + ' '
                    + store.getState().currentUser.lastName
                    : defaultWelcomeMessage}
            </div>
        )
    }
}