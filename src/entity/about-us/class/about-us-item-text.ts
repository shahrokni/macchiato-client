import AboutUsItem from "./about-us-item";
export default class AboutUsTextItem extends AboutUsItem{
     constructor(){
        super();
        this.text = '';
        this.header='';
     }
     header:String;
     text:String;     
}