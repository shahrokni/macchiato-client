import ITermOfUse from '../interface/term-of-use';
export default class TermOfUse implements ITermOfUse {
    constructor() {
        this.version = '';
        this.description = '';
    }
    version: String;
    description: String;
}