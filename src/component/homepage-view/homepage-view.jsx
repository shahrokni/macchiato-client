import React from 'react';
import WelcomeBox from './welcome-box';
import HomepageLink from './homepage-link';
import './css/homepage-view.css';
import { appGeneralInfo } from '../../setup-general-information';
import { AuthenticationState } from '../../entity/global/authentication-state';
import ViewHandler from '../main-container/util/view-handler';
import UserService from '../../service/user-service/user-service';

export default class HomePage extends React.Component {

    constructor(props) {

        super(props);
        this.state = { isAuthenticated: AuthenticationState.NotSet };
    }

    componentDidMount() {

        let service = new UserService();        
        service.isUserAuthenticated((serverResponse)=>{

            let responseUtil = require('../../util/response-util/response-util');
            
            if(responseUtil.isAuthenticated(serverResponse)===true){

                this.setState({isAuthenticated:AuthenticationState.Authenticated});
            }
            else{
                this.setState({isAuthenticated:AuthenticationState.NotAuthenticated});
            }
        });
    }

    render() {

        let isUserAuthenticated = this.state.isAuthenticated;
        return (

            <React.Fragment>
                {isUserAuthenticated===AuthenticationState.Authenticated &&
                    <div className='fullSize-width flex-container flex-column absolute'
                        style={{ minHeight: '100%' }}>
                        <WelcomeBox />
                        <HomepageLink linkClick={this.props.linkClick} title='Vocabulary practice' name={appGeneralInfo.mainMenuItems.vocabPractice} />
                        <HomepageLink linkClick={this.props.linkClick} title='Listening practice' name={appGeneralInfo.mainMenuItems.listeningPractice} />
                        <HomepageLink linkClick={this.props.linkClick} title='Reading practice' name={appGeneralInfo.mainMenuItems.readingPractice} />
                        <HomepageLink linkClick={this.props.linkClick} title='Writing practice' name={appGeneralInfo.mainMenuItems.writingPractice} />
                        <HomepageLink linkClick={this.props.linkClick} title='Speaking practice' name={appGeneralInfo.mainMenuItems.speakingPractice} />
                        <HomepageLink linkClick={this.props.linkClick} title='Slang practice' name={appGeneralInfo.mainMenuItems.slangPractice} />
                        <HomepageLink linkClick={this.props.linkClick} title='Language level test' name={appGeneralInfo.mainMenuItems.languageLevel} />
                        <HomepageLink linkClick={this.props.linkClick} title='English mock test' name={appGeneralInfo.mainMenuItems.mockTests} />
                    </div>
                }
                {isUserAuthenticated===AuthenticationState.NotAuthenticated &&
                    <React.Suspense fallback={<h3>Loading ...</h3>}>
                        {ViewHandler.retrievRegisterView()}
                    </React.Suspense>
                }
            </React.Fragment>
        );
    }
}