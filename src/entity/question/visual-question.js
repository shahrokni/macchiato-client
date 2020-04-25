import { SWQuestion } from './sw-question';
import {AnswerType} from '../answer/answer-type';

export class VisualQuestion extends SWQuestion{

    constructor(){
        
        super();
        this.imageFileName = '';      
        this.answerType=AnswerType.NotSet;
    }
}