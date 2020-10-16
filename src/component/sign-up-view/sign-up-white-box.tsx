import React, { FunctionComponent } from 'react';
import AppIntroducer from '../../entity/app-introducer/interface/AppIntroducer';
import './css/sign-up-white-box.css';


interface SignUpStaticInfo {
    appIntroducers: AppIntroducer[],
    termOfUse:String
}


export const SignUpWhiteBox = (props:SignUpStaticInfo):JSX.Element=>{
    return (
                <React.Fragment>
                    <h1>
                    
                    </h1>
                </React.Fragment>
            );
}

