import React from 'react';
import './css/menu-btn.css';
export default class MenuBtn extends React.Component{   

    render(){
        return (

            <div id="menuBtn" className="absolute" onClick={this.props.menuBtnEventHandler}>
                <i className="material-icons pointer absolute">{this.props.menuBtnIcon}</i>
            </div>
        );
    }
}