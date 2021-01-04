import React, { Fragment, useEffect, useState } from 'react';
import { Language } from '../../entity/global/language';
import { appGeneralInfo } from '../../setup-general-information';
import SimpleBtn from '../simple-btn/simple-btn';
import './css/about-view.css';
export default function AboutView(): JSX.Element {


    useEffect(() => {

    });
    const englishBtnStyle = { size: '30vh', marginLeft: '5vh', height:'8vh' }
    const farsiBtnStyle = { size: '30vh', marginLeft: '5vh', height:'8vh' }
    return (
        <div className='aboutUsContainer'>
            <div className='aboutUsCenterBox'>
                <div className='aboutUsMacchiatoLog'>
                    <div className='aboutUsLogoImage'>
                    </div>
                    <div className='aboutUsMacchiatoTitle'>
                        English Macchiato
                    </div>
                </div>
                <div className='aboutUsLanguageBox'>
                    <SimpleBtn simpleStyle={englishBtnStyle}
                        action={() => {                           
                            window.location.href = appGeneralInfo.baseUrl + appGeneralInfo.views.aboutEnglish;
                        }}                        
                        text={Language[Language.English]} />

                    <SimpleBtn
                        action={() => {                           
                            window.location.href = appGeneralInfo.baseUrl + appGeneralInfo.views.aboutPersian;
                        }}
                        simpleStyle={farsiBtnStyle}
                        extraClass={'persianFont'}
                        text={'فارسی'} />

                </div>
            </div>
        </div>
    );
}