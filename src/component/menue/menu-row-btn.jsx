import React from 'react';
import './css/menu-row-btn.css';

export default class MenuRowBtn extends React.Component {

    render() {
        return (

            <div className="menuRowBtn">
                <div className="menuRowBtnIcon">
                    <i className="material-icons-outlined pointer">{this.props.icon}</i>
                </div>
                <div className="menuRowBtnTitle">
                    {this.props.title}
                </div>
                {this.props.newMessages > 0 &&
                    <div className="menuRowBtnTitle newMsgCount"
                        style={{ backgroundColor: '#D9183B', color: '#FFFFFF' }}>
                        {this.props.newMessages}
                    </div>
                }
            </div>
        );
    }
}