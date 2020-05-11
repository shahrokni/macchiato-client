import React from 'react';
import './css/menu.css';
import MenuRowBtn from './menu-row-btn';

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
        rowBtns.push(<MenuRowBtn icon='home' title='Home Page' key='1' />);
        rowBtns.push(<MenuRowBtn icon='g_translate' title='Language Level' key='2' />);
        rowBtns.push(<MenuRowBtn icon='assignment' title='English mock tests' key='3' />);
        rowBtns.push(<MenuRowBtn icon='spellcheck' title='Vocabulary practice' key='4' />);
        rowBtns.push(<MenuRowBtn icon='hearing' title='Listening practice' key='5' />);
        rowBtns.push(<MenuRowBtn icon='library_books' title='Reading practice' key='6' />);
        rowBtns.push(<MenuRowBtn icon='create' title='Writing practice' key='7' />);
        rowBtns.push(<MenuRowBtn icon='mic_none' title='Speaking practice' key='8' />);
        rowBtns.push(<MenuRowBtn icon='text_rotation_angledown' title='Slang practice' key='9' />);
        rowBtns.push(<MenuRowBtn icon='bar_chart' title='Your reports' key='10' />);
        rowBtns.push(<MenuRowBtn icon='person_outline' title='Your Account' key='11' />);
        rowBtns.push(<MenuRowBtn icon='account_balance_wallet' title='Your wallet' key='12' />);        
        rowBtns.push(<MenuRowBtn icon='email' title='Your messages' newMessages={this.state.countNewMessages} key='13' />);
        rowBtns.push(<MenuRowBtn icon='info' title='About' key='14' />);

        return rowBtns;
    }
}