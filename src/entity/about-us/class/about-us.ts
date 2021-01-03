import AboutUsItem from '../class/about-us-item';
import { Language } from '../../global/language';
export default class AboutUs {
    constructor() {
        this.AboutUsItems = [];
        this.language = Language.English;
    }
    AboutUsItems: AboutUsItem[];
    language: Language;

    getSortedAboutUsItems(): AboutUsItem[] {

        const sortedAboutUsItems = this.AboutUsItems.sort((element1: AboutUsItem, element2: AboutUsItem): number => {
            return element1.order - element2.order;
        });
        return sortedAboutUsItems;
    }
}