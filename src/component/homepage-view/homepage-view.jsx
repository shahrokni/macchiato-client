import React from 'react';
import WelcomeBox from './welcome-box';
import HomepageLink from './homepage-link';
import './css/homepage-view.css';
import {appGeneralInfo} from '../../setup-general-information';

export default class HomePage extends React.Component{

   render(){
       return (
           <div className='fullSize-width flex-container flex-column'
           style={{minHeight:'100%'}}>
               <WelcomeBox/>
               <HomepageLink title='Vocabulary practice' name={appGeneralInfo.mainMenuItems.vocabPractice}/>
               <HomepageLink title='Listening practice' name={appGeneralInfo.mainMenuItems.listeningPractice}/>
               <HomepageLink title='Reading practice' name={appGeneralInfo.mainMenuItems.readingPractice}/>
               <HomepageLink title='Writing practice' name={appGeneralInfo.mainMenuItems.writingPractice}/>
               <HomepageLink title='Speaking practice' name={appGeneralInfo.mainMenuItems.speakingPractice}/>
               <HomepageLink title='Slang practice' name={appGeneralInfo.mainMenuItems.slangPractice}/>
               <HomepageLink title='Language level test' name={appGeneralInfo.mainMenuItems.languageLevel}/>
               <HomepageLink title='English mock test' name={appGeneralInfo.mainMenuItems.mockTests}/>
           </div>
       );
   }
}