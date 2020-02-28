export default class RestProvider{

    static createInstance(timeout:Number){

        const axios = require('axios');
        const instance = axios.create({         
            timeout: timeout,
        });

        return instance;
    }
}