import { AboutUsItemType } from '../enum/about-us-item-type';

export default class AboutUsItem {
    constructor() {
        this.type = AboutUsItemType.Text;
        this.order = 0;
    }
    type: AboutUsItemType;
    order: number;
}

