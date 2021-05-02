import React, { FunctionComponent, useState } from 'react';
import './css/foundation.css'
import Background from '../background/background';
import Curtain from '../curtain/curtain';
import MenuBar from '../menu-bar/menu-bar';
import { Menu } from '../menu/menu';
import MainContainer from '../main-container/main-container';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import UserMessageService from '../../service/user-message-service/user-message-service';

export const Foundation: FunctionComponent = () => {

    const [menuClosed, setMenueClosed] = useState('menuClosed');
    const [menuBtnIcon, setMenuBtnIcon] = useState('menu');
   
    const menuRowBtnEventHandler = (): void => {
        setMenueClosed('menuClosed');
        setMenuBtnIcon('menu')
    }
    const menuBtnEventHandler = (): void => {
        if (menuClosed === 'menuClosed') {            
            setMenueClosed('menuOpen');
            setMenuBtnIcon('highlight_off');  
        }
        else {           
            setMenueClosed('menuClosed');
            setMenuBtnIcon('menu');
        }
    }
    return (

        <React.Fragment>
            <Background />
            <Router>
                <MenuBar menuBtnIcon={menuBtnIcon}
                    menuBtnEventHandler={menuBtnEventHandler} />
                <Menu
                    menuRowBtnEventHandler={menuRowBtnEventHandler}
                    isClosed={menuClosed}                   
                />
                <MainContainer />
            </Router>
            <Curtain />
        </React.Fragment>
    );


}