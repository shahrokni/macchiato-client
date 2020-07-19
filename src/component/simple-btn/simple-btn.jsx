import React from 'react';
import './css/simple-btn.css';

export default class SimpleBtn extends React.Component {

    render() {

        let btnStyle = 'simpleBtnPrimaryStyle';
        if (this.props.secondryTheme === true) {
            btnStyle = 'simpleBtnSecondaryStyle';
        }
        return (
            <div
                onClick = {this.props.action} 
                className={'simpleBtn ' + btnStyle}
                style={{
                    width: this.props.simpleStyle.size,
                    textAlign: this.props.simpleStyle.textAlign,
                    marginTop: this.props.simpleStyle.marginTop,
                    marginLeft: this.props.simpleStyle.marginLeft,
                    float: this.props.simpleStyle.float
                }}>
                {this.props.text}
            </div>
        )
    }
}