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
                ref={this.props.buttonRef}
                type='button'
                onClick={this.props.action}
                id={this.props.id}                
                className={'simpleBtn ' + btnStyle + ((this.props.extraClass)?' '+this.props.extraClass:'')}
                style={{
                    height: this.props.simpleStyle.height && this.props.simpleStyle.height,
                    width: this.props.simpleStyle.size && this.props.simpleStyle.size,
                    textAlign: this.props.simpleStyle.textAlign && this.props.simpleStyle.textAlign,
                    marginTop: this.props.simpleStyle.marginTop && this.props.simpleStyle.marginTop,
                    marginLeft: this.props.simpleStyle.marginLeft && this.props.simpleStyle.marginLeft,
                    float: this.props.simpleStyle.float && this.props.simpleStyle.float
                }}>
                {this.props.text}
            </button>
        )
    }
}