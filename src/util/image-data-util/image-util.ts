import Image from "../../entity/image/image";

export default class ImageUtil {

    static getImageName(image: Image): string {
        if (!image || !image.name)
            return '';
        const mtp = '-mtp';
        const mtl = '-mtl';
        const ipad = '-ipad';
        const desktop = '-desktop';
        let imageName = '';

        const mobileTabletPrtMQ = window.matchMedia('only screen and (max-width:767px) and (orientation: portrait)');
        const mobileTabletLandscapeMQ = window.matchMedia('only screen and (max-width:767px) and (orientation: landscape)');
        const ipadFamilyMQ = window.matchMedia('only screen and (min-width: 768px) and (orientation: portrait)');
        const desktopFamilyMQ = window.matchMedia('only screen and (min-width: 768px) and (orientation: landscape)');

        if (image.hasMobileTabletPortrait && mobileTabletPrtMQ.matches)
            imageName = image.name + mtp;
        else if (image.hasMobileTabletLandscape && mobileTabletLandscapeMQ.matches)
            imageName = image.name + mtl;
        else if (image.hasIPadFamily && ipadFamilyMQ.matches)
            imageName = image.name + ipad;
        else if (image.hasDesktop && desktopFamilyMQ.matches)
            imageName = image.name + desktop;
        else
            imageName = image.name;
            
        return imageName;
    }
}