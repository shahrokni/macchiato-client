import React, { useEffect, useState } from 'react';
import SignupLogoBox from './sign-up-logo-box';
import { SignUpWhiteBox } from './sign-up-white-box';
import IAppIntroducer from '../../entity/app-introducer/interface/IAppIntroducer';
import IntroducerService from '../../service/introducer-service/introducer-service';
import SimpleNarrowWaiting from '../../component/simple-waiting/simple-waiting';
import './css/sign-up-view.css';

let appIntroducers: IAppIntroducer[] = [];
export default function SignUpView() {
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        const introducerService = new IntroducerService();
        introducerService.getAllIntroducers()
            .then((introducers) => {
                appIntroducers = introducers as IAppIntroducer[];
                setIsReady(true);
            });
    });
    return (
        <div className='signupViewContainer'>
            <SignupLogoBox />
            {
                (isReady === true)
                    ? <SignUpWhiteBox appIntroducers={appIntroducers} />
                    : <SimpleNarrowWaiting />
            }
        </div>
    );
}