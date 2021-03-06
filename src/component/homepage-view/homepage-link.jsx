import React from 'react';
import './css/homepage-link.css';
import { Link } from "react-router-dom";
export default class HomepageLink extends React.Component {
   
    render() {
        return (
            <div className="homepageLinkBtn" >
                <div className="homepageLinkTitle fitContent" onClick={this.props.linkClick}>
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