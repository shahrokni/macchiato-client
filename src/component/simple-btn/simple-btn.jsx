import React from 'react';
import './css/simple-btn.css';

export default class SimpleBtn extends React.Component{

    render(){

        return(
            <div className="simpleBtn"
            style={{width:this.props.simpleStyle.size,
            textAlign:this.props.simpleStyle.textAlign,
            marginTop:this.props.simpleStyle.marginTop,
            marginLeft:this.props.simpleStyle.marginLeft,
            float:this.props.simpleStyle.float}}>
                {this.props.text}
            </div>
        )
    }
}