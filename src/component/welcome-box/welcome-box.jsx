import React from 'react';
import './css/welcome-box.css';
import store from '../../util/state-management-handler/store';

export default class WelcomeBox extends React.Component{

    constructor(props){

        super(props);
        this.state = {welcomeMessage:'Welcome to English Macchiato!'};
    }

    componentDidMount(){

        let userDetail = store.getState().user;        
        if(userDetail){

            this.setState({welcomeMessage:'Welcome '+userDetail.name+' '+userDetail.lastName+'!'});
        }
    }   

    render(){
        return (
            <div className="welcomeBox">
              {this.state.welcomeMessage}
            </div>
        )
    }
}