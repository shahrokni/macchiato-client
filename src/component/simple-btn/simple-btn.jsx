import React from 'react';
import './css/simple-btn.css';

export default class SimpleBtn extends React.Component {

    render() {

        let btnStyle = 'simpleBtnPrimaryStyle';
        if (this.props.secondryTheme === true) {
            btnStyle = 'simpleBtnSecondaryStyle';
        }
        return (
            <button
                ref = {this.props.buttonRef}
                type='button'
                onClick = {this.props.action} 
                /*TODO: ON KEY PRESSED SIGNIN ACTION...*/
                className={'simpleBtn ' + btnStyle}
                style={{
                    width: this.props.simpleStyle.size,
                    textAlign: this.props.simpleStyle.textAlign,
                    marginTop: this.props.simpleStyle.marginTop,
                    marginLeft: this.props.simpleStyle.marginLeft,
                    float: this.props.simpleStyle.float
                }}>
                {this.props.text}
            </button>
        )
    }
}