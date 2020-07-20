import { appGeneralInfo } from '../../../setup-general-information';
import React from 'react';
import {
    changeCurrentLocation,
    keepCurrentComponent
} from '../../../util/state-management-handler/actions';
import store from '../../../util/state-management-handler/store';


export default class ViewHandler {

    static retrieveView(innerLinkClickEventHandler) {

        let createdComponent = undefined;
        let windowUrl = window.location.href;
        let currentLocatin = (windowUrl.split(appGeneralInfo.baseUrl))[1];

        //Do not reload views, if the address has not been changed!
        if (store.getState().location === currentLocatin){            
            return store.getState().currentComponent;
        }

        //Keep the new location in the container
        store.dispatch(changeCurrentLocation(currentLocatin));
       

        if (currentLocatin === appGeneralInfo.mainMenuItems.homePage) {
            const HomePageView = React.lazy(() => import('../../homepage-view/homepage-view'));
            createdComponent = <HomePageView linkClick={innerLinkClickEventHandler} />;
        }
        if (currentLocatin === appGeneralInfo.mainMenuItems.languageLevel) {
            //TODO
            const GlobalMessageView = React.lazy(() => import('../../global-message-view/global-message-view'));
            createdComponent = <GlobalMessageView />;
        }
        if (currentLocatin === appGeneralInfo.mainMenuItems.mockTests) {

            const MockTestsView =
                React.lazy(() => import('../../mock-tests-view/mock-tests-view'));
            createdComponent = <MockTestsView />;
        }
        if (currentLocatin === appGeneralInfo.mainMenuItems.vocabPractice) {

            //TODO
            const PracticeFilterView =
                React.lazy(() => import('../../practice-filter-view/practice-filter-view'));
            createdComponent = <PracticeFilterView />;
        }
        if (currentLocatin === appGeneralInfo.mainMenuItems.listeningPractice) {
            //TODO
            const PracticeFilterView =
                React.lazy(() => import('../../practice-filter-view/practice-filter-view'));
            createdComponent = <PracticeFilterView />;
        }
        if (currentLocatin === appGeneralInfo.mainMenuItems.readingPractice) {
            //TODO
            const PracticeFilterView =
                React.lazy(() => import('../../practice-filter-view/practice-filter-view'));
            createdComponent = <PracticeFilterView />;
        }
        if (currentLocatin === appGeneralInfo.mainMenuItems.writingPractice) {
            //TODO
            const PracticeFilterView =
                React.lazy(() => import('../../practice-filter-view/practice-filter-view'));
            createdComponent = <PracticeFilterView />;
        }
        if (currentLocatin === appGeneralInfo.mainMenuItems.speakingPractice) {
            //TODO
            const PracticeFilterView =
                React.lazy(() => import('../../practice-filter-view/practice-filter-view'));
            createdComponent = <PracticeFilterView />;
        }
        if (currentLocatin === appGeneralInfo.mainMenuItems.slangPractice) {
            //TODO
            const PracticeFilterView =
                React.lazy(() => import('../../practice-filter-view/practice-filter-view'));
            createdComponent = <PracticeFilterView />;
        }
        if (currentLocatin === appGeneralInfo.mainMenuItems.reports) {

            const ReportsView =
                React.lazy(() => import('../../reports-view/reports-view'));
            createdComponent = <ReportsView />;
        }
        if (currentLocatin === appGeneralInfo.mainMenuItems.account) {

            const AccountView =
                React.lazy(() => import('../../account-view/account-view'));
            createdComponent = <AccountView />;
        }
        if (currentLocatin === appGeneralInfo.mainMenuItems.wallet) {

            const WalletView =
                React.lazy(() => import('../../wallet-view/wallet-view'));
            createdComponent = <WalletView />;
        }
        if (currentLocatin === appGeneralInfo.mainMenuItems.messages) {

            const MessagesView =
                React.lazy(() => import('../../message-box-view/message-box-view'));
            createdComponent = <MessagesView />;
        }
        if (currentLocatin === appGeneralInfo.mainMenuItems.about) {

            const AboutView =
                React.lazy(() => import('../../about-view/about-view'));
            createdComponent = <AboutView />;
        }
        if (currentLocatin === appGeneralInfo.views.sigin) {

            const SignInView =
                React.lazy(() => import('../../sign-in-view/sign-in-view'));
            createdComponent = <SignInView linkClick={innerLinkClickEventHandler}/>
        }
        if (currentLocatin === appGeneralInfo.views.signup) {

            const SignUpView =
                React.lazy(() => import('../../sign-up-view/sign-up-view'));
            createdComponent = <SignUpView />
        }

        if(currentLocatin === appGeneralInfo.views.forgotPassword){

            const ForgotPassword = 
                React.lazy(()=>import('../../forgot-password-view/forgot-password-view'));
            
                createdComponent = <ForgotPassword/>
        }
        store.dispatch(keepCurrentComponent(createdComponent));
        return createdComponent;
    }

    static retrievGlobalMessageView() {

        //TODO: Parameters?!
        const GlobalMessageView =
            React.lazy(() => import('../../global-message-view/global-message-view'));
        return <GlobalMessageView />
    }

    static retrievRegisterView(innerLinkClickEventHandler) {

        const RegisterView =
            React.lazy(() => import('../../register-view/register-view.jsx'));
        return <RegisterView linkClick={innerLinkClickEventHandler} />

    }
}