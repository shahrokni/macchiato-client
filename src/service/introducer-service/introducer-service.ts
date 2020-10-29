import Introducer from '../../entity/app-introducer/class/introducer';

export default class IntroducerService{

    async getAllIntroducers():Promise<Introducer[]|null>{
        return new Promise((resolve,reject)=>{
            resolve(null);
        });
    }
}