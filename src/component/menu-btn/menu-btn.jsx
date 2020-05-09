import React from 'react';
import './css/menu-btn.css';
export default class MenuBtn extends React.Component{

    render(){
        return (

            <div id="menuBtn" className="absolute">
                <i className="material-icons pointer absolute">menu</i>
            </div>
        );
    }
}