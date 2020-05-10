import React from 'react';
import './css/foundation.css'
import Background from '../background/background';
import Curtain from '../curtain/curtain';
import MenuBar from '../menu-bar/menu-bar';
import Menu from '../menue/menue';
export default class Foundation extends React.Component {

    render() {
        return (

            <React.Fragment>
                <Background />
                <MenuBar />
                <Menu/>
                <div id='mainContainer' className='fullSize absolute' style={{zIndex:0}}>
                   {/*  */}
                </div>
                <Curtain />
            </React.Fragment>
        );

    }
}