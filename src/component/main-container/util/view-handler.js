import {appGeneralInfo} from '../../../setup-general-information';
import React from 'react';

export default class ViewHandler {

    static retrieveView(innerLinkClickEventHandler){        
        
        let windowUrl = window.location.href;        
        let currentLocatin = (windowUrl.split(appGeneralInfo.baseUrl))[1];
        
        if (currentLocatin === appGeneralInfo.mainMenuItems.homePage) {
            const HomePageView = React.lazy(() => import('../../homepage-view/homepage-view'));
            return <HomePageView  linkClick={innerLinkClickEventHandler}/>
        }
        if(currentLocatin === appGeneralInfo.mainMenuItems.languageLevel){
            //TODO
            const GlobalMessageView = React.lazy(()=>import('../../global-message-view/global-message-view'));
            return <GlobalMessageView/>
        }
        if(currentLocatin === appGeneralInfo.mainMenuItems.mockTests){

            const MockTestsView =
            React.lazy(()=>import('../../mock-tests-view/mock-tests-view'));
            return <MockTestsView/>
        }
        if(currentLocatin === appGeneralInfo.mainMenuItems.vocabPractice){

            //TODO
            const PracticeFilterView = 
            React.lazy(()=>import('../../practice-filter-view/practice-filter-view'));
            return <PracticeFilterView/>;
        }
        if( currentLocatin === appGeneralInfo.mainMenuItems.listeningPractice){
            //TODO
            const PracticeFilterView = 
            React.lazy(()=>import('../../practice-filter-view/practice-filter-view'));
            return <PracticeFilterView/>;
        }
        if( currentLocatin === appGeneralInfo.mainMenuItems.readingPractice){
            //TODO
            const PracticeFilterView = 
            React.lazy(()=>import('../../practice-filter-view/practice-filter-view'));
            return <PracticeFilterView/>;
        }
        if( currentLocatin === appGeneralInfo.mainMenuItems.writingPractice){
            //TODO
            const PracticeFilterView = 
            React.lazy(()=>import('../../practice-filter-view/practice-filter-view'));
            return <PracticeFilterView/>;
        }
        if( currentLocatin === appGeneralInfo.mainMenuItems.speakingPractice){
            //TODO
            const PracticeFilterView = 
            React.lazy(()=>import('../../practice-filter-view/practice-filter-view'));
            return <PracticeFilterView/>;
        }
        if( currentLocatin === appGeneralInfo.mainMenuItems.slangPractice){
            //TODO
            const PracticeFilterView = 
            React.lazy(()=>import('../../practice-filter-view/practice-filter-view'));
            return <PracticeFilterView/>;
        }
        if(currentLocatin === appGeneralInfo.mainMenuItems.reports){            
            const ReportsView = 
            React.lazy(()=>import('../../reports-view/reports-view'));
            return <ReportsView/>;
        }
        if(currentLocatin === appGeneralInfo.mainMenuItems.account){            
            const AccountView = 
            React.lazy(()=>import('../../account-view/account-view'));
            return <AccountView/>;
        }
        if(currentLocatin === appGeneralInfo.mainMenuItems.wallet){            
            const WalletView = 
            React.lazy(()=>import('../../wallet-view/wallet-view'));
            return <WalletView/>;
        }
        if(currentLocatin === appGeneralInfo.mainMenuItems.messages){            
            const MessagesView = 
            React.lazy(()=>import('../../message-box-view/message-box-view'));
            return <MessagesView/>;
        }
        if(currentLocatin === appGeneralInfo.mainMenuItems.about){            
            const AboutView = 
            React.lazy(()=>import('../../about-view/about-view'));
            return <AboutView/>;
        }
    }

    static retrievGlobalMessageView(){

        const GlobalMessageView = 
        React.lazy(()=>import('../../global-message-view/global-message-view'));
        return <GlobalMessageView/>
    }

    static retrievRegisterView(){

        const RegisterView = 
        React.lazy(()=>import('../../register-view/register-view.jsx'));        
        return <RegisterView/>
        
    }
}