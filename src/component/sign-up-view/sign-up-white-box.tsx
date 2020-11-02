import React, { FunctionComponent } from 'react';
import AppIntroducer from '../../entity/app-introducer/interface/IAppIntroducer';
import './css/sign-up-white-box.css';


export interface SignUpStaticInfo {
    appIntroducers: AppIntroducer[],
    termOfUse:String
}


export const SignUpWhiteBox = (signUpStaticInfo:SignUpStaticInfo):JSX.Element=>{
    return (
                <React.Fragment>
                    <h1>
                    
                    </h1>
                </React.Fragment>
            );
}

