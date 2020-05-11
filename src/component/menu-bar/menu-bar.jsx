import React from 'react';
import './css/menu-bar.css'
import MenuBtn from '../menu-btn/menu-btn'
import MenuBarTitle from '../menu-bar-title/menu-bar-title';

export default class MenuBar extends React.Component {     
    
    render() {

        return (

            <div id="menuBar" style={{ zIndex: 1 }}>
                <MenuBtn menuBtnIcon = {this.props.menuBtnIcon} menuBtnEventHandler = {this.props.menuBtnEventHandler} />
                <MenuBarTitle/>
            </div>
        );
    }
}