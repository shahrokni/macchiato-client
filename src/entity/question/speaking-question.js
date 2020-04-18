
import { SWQuestion } from "./sw-question";
import {VoiceAnswer} from "../answer/voice-answer"
export class SpeakingQuestion extends SWQuestion{

   constructor(){
       
       this.answer = new VoiceAnswer();
   }
}