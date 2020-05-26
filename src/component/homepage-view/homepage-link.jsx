import React from 'react';
import './css/homepage-link.css';
import { Link } from "react-router-dom";
export default class HomepageLink extends React.Component {
   
    render() {
        return (
            <div className="homepageLinkBtn" onClick={this.props.linkClick}>
                <div className="homepageLinkTitle fitContent">
                    <Link to={'/' + this.props.name}>
                        {this.props.title}
                    </Link>
                </div>
                <div className="homepageLinkIcon">
                    <span className="material-icons hompageLinkIcon">
                        keyboard_arrow_right
                    </span>
                </div>
            </div>
        );
    }
}