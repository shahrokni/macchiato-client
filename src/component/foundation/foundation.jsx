import React from 'react';
import './css/foundation.css'
import Background from '../background/background';
import Curtain from '../curtain/curtain';
import MenuBar from '../menu-bar/menu-bar';
import Menu from '../menu/menu';
import MainContainer from '../main-container/main-container';

export default class Foundation extends React.Component {

    constructor(props) {

        super(props);
        this.menuBtnEventHandler = this.menuBtnEventHandler.bind(this);
        this.menuRowBtnEventHandler = this.menuRowBtnEventHandler.bind(this);
        this.state = { menuClosed: 'menuClosed',menuBtnIcon:'menu',currenInnerViewId:undefined};
    }
    componentDidMount(){
        //Home Page
    }
    menuRowBtnEventHandler(e){
        let btnId  = e.target.id;
        this.setState({currenInnerViewId:btnId,
            menuClosed: 'menuClosed',menuBtnIcon:'menu'});
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
                <Menu menuRowBtnEventHandler={this.menuRowBtnEventHandler} isClosed={this.state.menuClosed} />
                <MainContainer innerViewtId={this.state.currenInnerViewId}/>                    
                <Curtain />
            </React.Fragment>
        );

    }
}