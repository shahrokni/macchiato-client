import {AboutUsItemType} from '../enum/about-us-item-type';
import {Language} from '../../global/language';
export default class AboutUsItem {    
    constructor(){
       this.type = AboutUsItemType.Text;
       this.language = Language.English;
       this.order = 0;
    }
    type:AboutUsItemType;
    language: Language;
    order: Number;
}

