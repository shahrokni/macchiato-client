import React, { useEffect, useState } from 'react';
import { Language } from '../../entity/global/language';
import AboutUsService from '../../service/about-us-service/about-us-service';
import WhiteRibbon from '../white-ribbon/white-ribbon';
import AboutUs from '../../entity/about-us/class/about-us';
import AboutUsTextItem from '../../entity/about-us/class/about-us-item-text';
import './css/about-view.css';
import { AboutUsItemType } from '../../entity/about-us/enum/about-us-item-type';
import AboutUsImageItem from '../../entity/about-us/class/about-us-item-image';
import ImageUtil from '../../util/image-data-util/image-util';


export default function AboutView(): JSX.Element {


    const [aboutUsObject, setAboutUsObject] = useState<AboutUs | null>(null);
    const [hasDomChanged, setHasDomChanged] = useState(false);

    useEffect(() => {
        const aboutService = new AboutUsService();
        aboutService.getAboutUs(Language.English)
            .then((response) => {
                setAboutUsObject(response);
                setHasDomChanged(true);
            })
    }, []);

    return (
        <div className='aboutContainer'>
            <WhiteRibbon />
            <div className='aboutContentContainer'>
                <div className='aboutHeaderContainer'>
                    <h1 className='aboutHeader'>About Us / </h1>
                    <a href={'/aboutfa'} className='aboutFarsiHeader'> فارسی</a>
                </div>
                <div className='aboutTextImageBox'>
                    {(aboutUsObject != null && hasDomChanged) && createAboutItems(aboutUsObject)}
                </div>
            </div>
        </div>
    );
}

const createAboutItems = (aboutUs: AboutUs | null): JSX.Element[] => {
    let elements: JSX.Element[] = [];
    if (aboutUs != null) {
        const orderedItems = aboutUs.getSortedAboutUsItems();
        if (orderedItems && orderedItems.length !== 0) {
            for (let i = 0; i < orderedItems.length; i++) {
                if (orderedItems[i].type.toString() === AboutUsItemType[AboutUsItemType.Text]) {
                    const paragraph =
                        <div className='aboutTextItem' key={'aboutTextItem' + i}>
                            {((orderedItems[i] as AboutUsTextItem).header != null) &&
                                <h2 className='aboutItemHeader' key={'h' + i}>
                                    {(orderedItems[i] as AboutUsTextItem).header}
                                </h2>
                            }
                            <p key={'p' + i} className='aboutItemText'>
                                {(orderedItems[i] as AboutUsTextItem).text}
                            </p>
                        </div>;
                    elements.push(paragraph);
                    continue;
                }
                else if (orderedItems[i].type.toString() === AboutUsItemType[AboutUsItemType.Image]) {

                    const imageData = (orderedItems[i] as AboutUsImageItem);
                    const imageType = imageData.image.type;
                    const alt = imageData.image.alt;
                    let imageTargetName = ImageUtil.getImageName(imageData.image);

                    const img = <img alt={alt} key={'aboutImage' + i}
                        src={require('../../../src/resource/image/about/' + imageTargetName + imageType)}
                        className='aboutImage' />

                    elements.push(img);
                }
            }
        }
    }
    return elements;
}