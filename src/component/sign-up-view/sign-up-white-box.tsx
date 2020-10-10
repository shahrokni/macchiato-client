import React, { FunctionComponent } from 'react';
import AppIntroducer from '../../entity/app-introducer/interface/AppIntroducer';
import './css/sign-up-white-box.css';


export interface SignUpStaticInfo {
    appIntroducers: AppIntroducer[],
    termOfUse:string
}

const SignUpWhiteBox: FunctionComponent<SignUpStaticInfo> = (): JSX.Element => {
    return (
        <React.Fragment>
            <h1>
                Sign Up White Box!
            </h1>
        </React.Fragment>
    );
}
module.exports.SignUpWhiteBox = SignUpWhiteBox;