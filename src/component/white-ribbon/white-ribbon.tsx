import React from 'react';
import { appGeneralInfo } from '../../setup-general-information';
import './css/white-ribbon.css';
export default function WhiteRibbon():JSX.Element{
    return(
        <div className='whiteRibbonContainer'>
            <div className='whiteRibbonLogoContainer'>

            </div>
            <div className='whiteRibbonTitleContainer'>
                <div className='whiteRibbonAppTitle'>
                    {appGeneralInfo.appName}
                </div>
                <div className='whiteRibbonAppSlogan'>
                    {appGeneralInfo.appSlogan}
                </div>
            </div>
        </div>
    );
}
