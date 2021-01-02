import AboutUsItem from '../class/about-us-item';
export default class AboutUs {
    constructor() {
        this.AboutUsItems = [];
    }
    AboutUsItems: AboutUsItem[];

    GetSortedAboutUsItems(): AboutUsItem[] {

        const sortedAboutUsItems = this.AboutUsItems.sort((element1: AboutUsItem, element2: AboutUsItem): number => {
            const diff = element1.order.valueOf() - element2.order.valueOf();
            return diff;
        });
        return sortedAboutUsItems;
    }
}