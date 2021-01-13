import AboutUsItem from "./about-us-item";
import Image from '../../image/image';
export default class AboutUsImageItem extends AboutUsItem {
    constructor() {
        super();
        this.image = new Image();
    }
    image: Image;
}