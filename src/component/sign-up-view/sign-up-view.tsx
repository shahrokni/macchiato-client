import React, { useEffect, useState } from 'react';
import SignupLogoBox from './sign-up-logo-box';
import { SignUpWhiteBox } from './sign-up-white-box';
import AppIntroducer from '../../entity/app-introducer/interface/AppIntroducer';
import IntroducerService from '../../service/introducer-service/introducer-service';
import TermOfUseService from '../../service/term-of-use-service/term-of-use-service';
import './css/sign-up-view.css';
import TermOfUse from '../../entity/term-of-use/class/term-of-use';

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
                        if(termOfUse)
                            appTermOfUse.description = (termOfUse as TermOfUse).description;
                        setIsReady(true);
                    })
            });
    });
    return (
        <div className='signupViewContainer'>
            <SignupLogoBox />
            {isReady && <SignUpWhiteBox appIntroducers={appIntroducers} termOfUse={appTermOfUse.description} />}
        </div>
    );
}