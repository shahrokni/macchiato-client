import Question from './question';
export class SWQuestion extends Question{

    constructor(){

        super();
        this.cost = 0;
        this.context = '';
        this.questionItems=[];
    }
}