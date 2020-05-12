import React from 'react';
import {loadComponent} from '../../util/component-loader/component-loader';
import './css/foundation.css'
import Background from '../background/background';
import Curtain from '../curtain/curtain';
import MenuBar from '../menu-bar/menu-bar';
import Menu from '../menue/menu';
import MainContainer from '../main-container/main-container';


export default class Foundation extends React.Component {

    constructor(props) {

        super(props);
        this.menuBtnEventHandler = this.menuBtnEventHandler.bind(this);
        this.state = { menuClosed: 'menuClosed',menuBtnIcon:'menu' };
    }

    menuBtnEventHandler() {

        if (this.state.menuClosed === 'menuClosed') {
            this.setState({ menuClosed: 'menuOpen',menuBtnIcon:'highlight_off'});            
        }
        else {
            this.setState({ menuClosed: 'menuClosed',menuBtnIcon:'menu' });
        }
    }

    render() {
        return (

            <React.Fragment>
                <Background />
                <MenuBar menuBtnIcon={this.state.menuBtnIcon} menuBtnEventHandler={this.menuBtnEventHandler} />
                <Menu isClosed={this.state.menuClosed} />
                <MainContainer/>
                <Curtain />
            </React.Fragment>
        );

    }
}