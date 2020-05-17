import React from 'react';
import './css/menu.css';
import MenuRowBtn from './menu-row-btn';
import {appGeneralInfo} from '../../setup-general-information';

export default class Menu extends React.Component{

    constructor(props){

        super(props);
        this.state = {countNewMessages:0}
    }
    componentDidMount(){
        //TODO: service call for getting the count of new messages!
        this.setState({countNewMessages:21});
    }
    render(){
        let rowBtns = this.generateRowBtns();
        let classes = "absolute "+this.props.isClosed;
        return (

            <div id="menuDrawer" className={classes}>
                {rowBtns}
            </div>
        );
    }

    generateRowBtns(){
        
        let rowBtns = [];        
        rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={this.props.menuRowBtnEventHandler} icon='home' title='Home Page' key='1' name={appGeneralInfo.mainMenuItems.homePage} />);
        rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={this.props.menuRowBtnEventHandler} icon='g_translate' title='Language Level' key='2' name={appGeneralInfo.mainMenuItems.languageLevel} />);
        rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={this.props.menuRowBtnEventHandler} icon='assignment' title='English mock tests' key='3' name={appGeneralInfo.mainMenuItems.mockTests} />);
        rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={this.props.menuRowBtnEventHandler} icon='spellcheck' title='Vocabulary practice' key='4' name={appGeneralInfo.mainMenuItems.vocabPractice} />);
        rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={this.props.menuRowBtnEventHandler} icon='hearing' title='Listening practice' key='5' name={appGeneralInfo.mainMenuItems.listeningPractice} />);
        rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={this.props.menuRowBtnEventHandler} icon='library_books' title='Reading practice' key='6' name={appGeneralInfo.mainMenuItems.readingPractice} />);
        rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={this.props.menuRowBtnEventHandler} icon='create' title='Writing practice' key='7' name={appGeneralInfo.mainMenuItems.writingPractice} />);
        rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={this.props.menuRowBtnEventHandler} icon='mic_none' title='Speaking practice' key='8' name={appGeneralInfo.mainMenuItems.speakingPractice} />);
        rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={this.props.menuRowBtnEventHandler} icon='text_rotation_angledown' title='Slang practice' key='9' name={appGeneralInfo.mainMenuItems.slangPractice} />);
        rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={this.props.menuRowBtnEventHandler} icon='bar_chart' title='Your reports' key='10' name={appGeneralInfo.mainMenuItems.reports} />);
        rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={this.props.menuRowBtnEventHandler} icon='person_outline' title='Your Account' key='11' name={appGeneralInfo.mainMenuItems.account} />);
        rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={this.props.menuRowBtnEventHandler} icon='account_balance_wallet' title='Your wallet' key='12' name={appGeneralInfo.mainMenuItems.wallet} />);        
        rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={this.props.menuRowBtnEventHandler} icon='email' title='Your messages' newMessages={this.state.countNewMessages} key='13' name={appGeneralInfo.mainMenuItems.messages} />);
        rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={this.props.menuRowBtnEventHandler} icon='info' title='About' key='14' name={appGeneralInfo.mainMenuItems.about} />);

        return rowBtns;
    }
}