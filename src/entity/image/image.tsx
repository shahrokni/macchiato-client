export default class Image {
    constructor() {
        this.name = '';
        this.alt = '';
        this.type = '';
        this.hasMobileTabletPortrait = false;
        this.hasMobileTabletLandscape = false;
        this.hasIPadFamily = false;
        this.hasDesktop = false
    }
    name: string;
    alt: string;
    type: string;
    hasMobileTabletPortrait: boolean;
    hasMobileTabletLandscape: boolean;
    hasIPadFamily: boolean;
    hasDesktop: boolean;
}