import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';
import './css/menu.css';
import { MenuRowBtn } from './menu-row-btn';
import { appGeneralInfo } from '../../setup-general-information';

interface IMenuParams {
    isClosed: string;
    menuRowBtnEventHandler: () => void;
}

export const Menu: FunctionComponent<IMenuParams> = (props) => {

    const [rowBtns, setRowBtns] =
        useState<JSX.Element[] | undefined>(undefined);
    const [isClosed, setIsClosed] =
        useState(props.isClosed);
    const [cssClasses, setCssClasses] =
        useState<string>("absolute " + props.isClosed)

    useEffect(() => {
        setRowBtns(generateRowBtns(props.menuRowBtnEventHandler) as JSX.Element[]);
    }, []);

    useEffect(() => {
        setIsClosed(props.isClosed)
        setCssClasses("absolute " + isClosed);
    });

    return (

        <div id="menuDrawer" className={cssClasses}>
            {rowBtns}
        </div>
    );
}

const generateRowBtns = (menuRowBtnEventHandler: () => void):
    JSX.Element[] => {
    let rowBtns: JSX.Element[] = [];
    rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={menuRowBtnEventHandler}
        icon='home'
        title='Home Page'
        key='1'
        isMessagesBtn = {undefined}
        name={appGeneralInfo.mainMenuItems.homePage}
    />);
    rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={menuRowBtnEventHandler}
        icon='g_translate'
        title='Language Level'
        key='2'
        isMessagesBtn = {undefined}
        name={appGeneralInfo.mainMenuItems.languageLevel}
    />);
    rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={menuRowBtnEventHandler}
        icon='assignment'
        title='English mock tests'
        key='3'
        isMessagesBtn = {undefined}
        name={appGeneralInfo.mainMenuItems.mockTests} />);
    rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={menuRowBtnEventHandler}
        icon='spellcheck'
        title='Vocabulary practice'
        key='4'
        isMessagesBtn = {undefined}
        name={appGeneralInfo.mainMenuItems.vocabPractice} />);
    rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={menuRowBtnEventHandler}
        icon='hearing'
        title='Listening practice'
        key='5'
        isMessagesBtn = {undefined}
        name={appGeneralInfo.mainMenuItems.listeningPractice} />);
    rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={menuRowBtnEventHandler}
        icon='library_books'
        title='Reading practice'
        key='6'
        isMessagesBtn = {undefined}
        name={appGeneralInfo.mainMenuItems.readingPractice} />);
    rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={menuRowBtnEventHandler}
        icon='create'
        title='Writing practice'
        key='7'
        isMessagesBtn = {undefined}
        name={appGeneralInfo.mainMenuItems.writingPractice} />);
    rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={menuRowBtnEventHandler}
        icon='mic_none'
        title='Speaking practice'
        key='8'        
        isMessagesBtn = {undefined}
        name={appGeneralInfo.mainMenuItems.speakingPractice} />);
    rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={menuRowBtnEventHandler}
        icon='text_rotation_angledown'
        title='Slang practice'
        key='9'
        isMessagesBtn = {undefined}
        name={appGeneralInfo.mainMenuItems.slangPractice} />);
    rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={menuRowBtnEventHandler}
        icon='bar_chart'
        title='Your reports'
        key='10'
        isMessagesBtn = {undefined}
        name={appGeneralInfo.mainMenuItems.reports} />);
    rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={menuRowBtnEventHandler}
        icon='person_outline'
        title='Your Account'
        key='11'
        isMessagesBtn = {undefined}
        name={appGeneralInfo.mainMenuItems.account} />);
    rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={menuRowBtnEventHandler}
        icon='account_balance_wallet'
        title='Your wallet'
        key='12'
        isMessagesBtn = {undefined}
        name={appGeneralInfo.mainMenuItems.wallet} />);
    rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={menuRowBtnEventHandler}
        icon='email'
        title='Your messages'
        key='13'
        isMessagesBtn = {true}
        name={appGeneralInfo.mainMenuItems.messages} />);
    rowBtns.push(<MenuRowBtn menuRowBtnEventHandler={menuRowBtnEventHandler}
        icon='info'
        title='About'
        key='14'
        isMessagesBtn = {undefined}
        name={appGeneralInfo.mainMenuItems.about} />);

    return rowBtns;
}