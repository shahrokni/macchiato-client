import React, { useEffect, useState } from 'react';
import SignupLogoBox from './sign-up-logo-box';
import { SignUpWhiteBox, SignUpStaticInfo } from './sign-up-white-box';
import AppIntroducer from '../../entity/app-introducer/interface/IAppIntroducer';
import IntroducerService from '../../service/introducer-service/introducer-service';
import TermOfUseService from '../../service/term-of-use-service/term-of-use-service';
import TermOfUse from '../../entity/term-of-use/class/term-of-use';
import SimpleNarrowWaiting from '../../component/simple-waiting/simple-waiting';
import './css/sign-up-view.css';

export default function SignUpView() {

    const [isReady, setIsReady] = useState(false);
    let appIntroducers: AppIntroducer[] = [];
    let appTermOfUse = new TermOfUse();

    useEffect(() => {

        const introducerService = new IntroducerService();
        introducerService.getAllIntroducers()
            .then((introducers) => {
                appIntroducers = introducers as AppIntroducer[];
                const termOfUseService = new TermOfUseService();
                termOfUseService.getApplicationTerm()
                    .then((termOfUse) => {
                        if (termOfUse)
                            appTermOfUse.description = (termOfUse as TermOfUse).description;
                        setIsReady(true);
                    })
            });
    });
    return (
        <div className='signupViewContainer'>
            <SignupLogoBox />
            {
                (isReady === true)
                    ? <SignUpWhiteBox termOfUse={appTermOfUse.description}
                        appIntroducers={appIntroducers} />
                    : <SimpleNarrowWaiting />
            }
        </div>
    );
}