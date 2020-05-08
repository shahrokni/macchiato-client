import React from 'react';
import './css/menu-bar.css'
import MenuBtn from '../menu-btn/menu-btn'
export default class MenuBar extends React.Component {

    render() {

        return (

            <div id="menuBar" style={{ zIndex: 1 }}>
                <MenuBtn />
            </div>
        );
    }
}