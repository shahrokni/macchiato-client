export default class RestProvider{

    static getTimeoutDuration(){
        return 1500;
    }
    
    static createInstance(timeout){

        const axios = require('axios');
        const instance = axios.create({         
            timeout: timeout,
        });

        return instance;
    }
}