import React, { Fragment, useEffect, useState } from 'react';
import AboutUs from '../../entity/about-us/class/about-us'
import { Language } from '../../entity/global/language';
import AboutUsService from '../../service/about-us-service/about-us-service';
export default function AboutView(): JSX.Element {

    const [aboutUsData, setAboutUsData] = useState<AboutUs | null>(null);
    useEffect(() => {
        const service = new AboutUsService();
        if (!aboutUsData) {
            service.getAboutUs(Language.English)
                .then((result) => {
                    setAboutUsData(result);
                })
                .catch((error) => {
                    console.log('** ' + error);
                });
        }
    });

    return (
        <Fragment>
            {(!aboutUsData) ? (<h1>About Us View</h1>) : (

                <Fragment>
                    <h3>{Language[aboutUsData.language]}</h3>
                </Fragment>
            )}

        </Fragment>

    );
}