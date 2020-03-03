export default class RestProvider{

    static createInstance(timeout){

        const axios = require('axios');
        const instance = axios.create({         
            timeout: timeout,
        });

        return instance;
    }
}