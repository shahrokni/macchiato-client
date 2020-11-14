import ITermOfUse from '../interface/term-of-use';
export default class TermOfUse implements ITermOfUse {
    constructor() {
        this.version = 0;
        this.description = '';
    }
    version: Number;
    description: String;
}