import AppIntroducer from '../interface/AppIntroducer';

export default class Introducer implements AppIntroducer{

    constructor(){
        this.code='';
        this.name='';
    }
    code: string;
    name: string;
}