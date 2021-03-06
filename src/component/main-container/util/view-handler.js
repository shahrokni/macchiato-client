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
        const windowUrl = window.location.href;
        const currentLocatinParam = (windowUrl.split(appGeneralInfo.baseUrl))[1];   
        const [currentLocatin,param]  = currentLocatinParam.split('/');       


        //Do not reload views, if the address has not been changed!
        if (store.getState().location === currentLocatin) {
            return store.getState().currentComponent;
        }

        //Keep the new location in the container
        store.dispatch(changeCurrentLocation(currentLocatin));

        /* Home Page */
        if (currentLocatin === appGeneralInfo.mainMenuItems.homePage) {
            const HomePageView = 
            React.lazy(() => import('../../homepage-view/homepage-view'));
            createdComponent = <HomePageView linkClick={innerLinkClickEventHandler} />;
        }
        /* CHECK USER INFORMATION */
        if(currentLocatin === appGeneralInfo.views.checkUserInformation){
            const CheckUserInformationView = 
            React.lazy(()=>import('../../check-user-information/check-user-information'));
            createdComponent = <CheckUserInformationView/>
        }
        /*Language Level*/
        if (currentLocatin === appGeneralInfo.mainMenuItems.languageLevel) {
            //TODO
            const GlobalMessageView = 
            React.lazy(() => import('../../global-message-view/global-message-view'));
            createdComponent = <GlobalMessageView linkClick={innerLinkClickEventHandler}/>;
        }

        /* Mock Tests */
        if (currentLocatin === appGeneralInfo.mainMenuItems.mockTests) {

            const MockTestsView =
                React.lazy(() => import('../../mock-tests-view/mock-tests-view'));
            createdComponent = <MockTestsView linkClick={innerLinkClickEventHandler}/>;
        }

        /*Vocabulary Practice*/
        if (currentLocatin === appGeneralInfo.mainMenuItems.vocabPractice) {

            //TODO
            const PracticeFilterView =
                React.lazy(
                    () => import('../../practice-filter-view/practice-filter-view'));
            createdComponent =
             <PracticeFilterView linkClick={innerLinkClickEventHandler}/>;
        }

        /*Listening Practice*/
        if (currentLocatin === appGeneralInfo.mainMenuItems.listeningPractice) {
            //TODO
            const PracticeFilterView =
                React.lazy(
                    () => import('../../practice-filter-view/practice-filter-view'));
            createdComponent =
             <PracticeFilterView linkClick={innerLinkClickEventHandler}/>;
        }

        /*Reading Practice*/
        if (currentLocatin === appGeneralInfo.mainMenuItems.readingPractice) {
            //TODO
            const PracticeFilterView =
                React.lazy(
                    () => import('../../practice-filter-view/practice-filter-view'));
            createdComponent = 
            <PracticeFilterView linkClick={innerLinkClickEventHandler}/>;
        }

        /*Writing Practice*/
        if (currentLocatin === appGeneralInfo.mainMenuItems.writingPractice) {
            //TODO
            const PracticeFilterView =
                React.lazy(
                    () => import('../../practice-filter-view/practice-filter-view'));
            createdComponent =
             <PracticeFilterView linkClick={innerLinkClickEventHandler}/>;
        }

        /*Speaking Practice*/
        if (currentLocatin === appGeneralInfo.mainMenuItems.speakingPractice) {
            //TODO
            const PracticeFilterView =
                React.lazy(
                    () => import('../../practice-filter-view/practice-filter-view'));
            createdComponent = 
            <PracticeFilterView linkClick={innerLinkClickEventHandler}/>;
        }

        /*Slang Practice*/
        if (currentLocatin === appGeneralInfo.mainMenuItems.slangPractice) {
            //TODO
            const PracticeFilterView =
                React.lazy(
                    () => import('../../practice-filter-view/practice-filter-view'));
            createdComponent =
             <PracticeFilterView linkClick={innerLinkClickEventHandler}/>;
        }

        /* Reports */
        if (currentLocatin === appGeneralInfo.mainMenuItems.reports) {

            const ReportsView =
                React.lazy(() => import('../../reports-view/reports-view'));
            createdComponent = <ReportsView linkClick={innerLinkClickEventHandler}/>;
        }

        /*Account*/
        if (currentLocatin === appGeneralInfo.mainMenuItems.account) {

            const ProfileView =
                React.lazy(() => import('../../profile-view/profile-view'));
            createdComponent = <ProfileView linkClick={innerLinkClickEventHandler}/>;
        }

        /*Wallet*/
        if (currentLocatin === appGeneralInfo.mainMenuItems.wallet) {

            const WalletView =
                React.lazy(() => import('../../wallet-view/wallet-view'));
            createdComponent = <WalletView linkClick={innerLinkClickEventHandler}/>;
        }

        /*Message*/
        if (currentLocatin === appGeneralInfo.mainMenuItems.messages) {

            const MessagesListView =
                React.lazy(() => import('../../message-box-view/message-box-view'));
            createdComponent = (param) ?  <MessagesListView requestedPage={param} /> : 
            <MessagesListView requestedPage={undefined} />;
        }

        /* Message View */
        if(currentLocatin === appGeneralInfo.views.messageview){
            const MessageDetailView = 
                React.lazy(()=>import('../../message-detail-view/message-detail-view'));
            createdComponent = <MessageDetailView info={param} />
        }

        /* Message Delete */
        if(currentLocatin === appGeneralInfo.views.messagedelete){
            const MessageDeleteView = 
                React.lazy(()=>import('../../message-delete/message-delete'));
                createdComponent = <MessageDeleteView info={param} />
        }

        /*About*/
        if (currentLocatin === appGeneralInfo.mainMenuItems.about) {

            const AboutView =
                React.lazy(() => import('../../about-view/about-view'));
            createdComponent = <AboutView linkClick={innerLinkClickEventHandler}/>;
        }

        /*Sign in */
        if (currentLocatin === appGeneralInfo.views.sigin) {

            const SignInView =
                React.lazy(() => import('../../sign-in-view/sign-in-view'));
            createdComponent = <SignInView linkClick={innerLinkClickEventHandler} />
        }

        /*Sign up*/
        if (currentLocatin === appGeneralInfo.views.signup) {

            const SignUpView =
                React.lazy(() => import('../../sign-up-view/sign-up-view'));
            createdComponent = <SignUpView linkClick={innerLinkClickEventHandler}/>
        }

        /*Forgot password*/
        if (currentLocatin === appGeneralInfo.views.forgotPassword) {

            const ForgotPassword =
                React.lazy(() => import('../../forgot-password-view/forgot-password-view'));

            createdComponent = <ForgotPassword linkClick={innerLinkClickEventHandler}/>
        }

        /* Global message view */
        if (currentLocatin === appGeneralInfo.views.globalMessage) {

            const GlobalMessageView =
                React.lazy(() => import('../../global-message-view/global-message-view'));

            createdComponent = <GlobalMessageView linkClick={innerLinkClickEventHandler}/>
        }

        /* Register view */
        if(currentLocatin === appGeneralInfo.views.register){

            const RegisterView = 
                React.lazy(()=>import('../../register-view/register-view'));
            
            createdComponent = <RegisterView linkClick={innerLinkClickEventHandler}/>
        }
        /* Term of use */   
        if(currentLocatin === appGeneralInfo.views.termOfUse){
            const TermOfUse = 
                React.lazy(()=>import('../../term-of-use/term-of-use'));
            createdComponent = <TermOfUse linkClick={innerLinkClickEventHandler}/>
        }
        if(currentLocatin === 'test'){
            const Test = 
                React.lazy(()=>import('../../test/test'));
            createdComponent = <Test/>
        }
        store.dispatch(keepCurrentComponent(createdComponent));
        return createdComponent;
    }
}