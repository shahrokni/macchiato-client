import React from 'react';
import './css/foundation.css'
import Background from '../background/background';
import Curtain from '../curtain/curtain';
import MenuBar from '../menu-bar/menu-bar';
import Menu from '../menue/menue';
export default class Foundation extends React.Component {

    constructor(props){

        super(props);
        this.menuBtnEventHandler = this.menuBtnEventHandler.bind(this);
        this.state={menuClosed:'menuClosed'};
    }

    menuBtnEventHandler(){

        if(this.state.menuClosed ==='menuClosed')
            this.setState({menuClosed:'menuOpen'});
        else
            this.setState({menuClosed:'menuClosed'})
    }

    render() {
        return (

            <React.Fragment>
                <Background />
                <MenuBar menuBtnEventHandler = {this.menuBtnEventHandler} />
                <Menu isClosed={this.state.menuClosed}/>
               { /*<div id='mainContainer' className='fullSize absolute' style={{zIndex:0}}>
                   
                </div>*/}
                <Curtain />
            </React.Fragment>
        );

    }
}