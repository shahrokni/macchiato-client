import React from 'react';
import WelcomeBox from './welcome-box';
import HomepageLink from './homepage-link';
import './css/homepage-view.css';
import {appGeneralInfo} from '../../setup-general-information';

export default class HomePage extends React.Component{

   render(){
       return (
           <div className='fullSize-width flex-container flex-column absolute'
           style={{minHeight:'100%'}}>
               <WelcomeBox/>
               <HomepageLink linkClick={this.props.linkClick} title='Vocabulary practice' name={appGeneralInfo.mainMenuItems.vocabPractice}/>
               <HomepageLink linkClick={this.props.linkClick} title='Listening practice' name={appGeneralInfo.mainMenuItems.listeningPractice}/>
               <HomepageLink linkClick={this.props.linkClick} title='Reading practice' name={appGeneralInfo.mainMenuItems.readingPractice}/>
               <HomepageLink linkClick={this.props.linkClick} title='Writing practice' name={appGeneralInfo.mainMenuItems.writingPractice}/>
               <HomepageLink linkClick={this.props.linkClick} title='Speaking practice' name={appGeneralInfo.mainMenuItems.speakingPractice}/>
               <HomepageLink linkClick={this.props.linkClick} title='Slang practice' name={appGeneralInfo.mainMenuItems.slangPractice}/>
               <HomepageLink linkClick={this.props.linkClick} title='Language level test' name={appGeneralInfo.mainMenuItems.languageLevel}/>
               <HomepageLink linkClick={this.props.linkClick} title='English mock test' name={appGeneralInfo.mainMenuItems.mockTests}/>
           </div>
       );
   }
}