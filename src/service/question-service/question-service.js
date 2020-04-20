import Response from '../../communication/entity/response';
import RestProvider from '../../communication/entity/rest-provider';
import ErrorMessages from '../../resource/text/error-message';

export default class QuestionService{

    constructor(){

        this.dateUtil = require('../../util/date-util/date-util');
    }

    addNewReadingQuestion(readingQuestion,callBack){

        let response = new Response();
        response.isSuccessful = false;
        response.operationTimestamp = this.dateUtil.getCurrentDateTime();
        let restInstance = RestProvider.createInstance(RestProvider.getTimeoutDuration());

        restInstance.post('admin_question_api/v1/question/reading',readingQuestion).then(function (res) {

            let responseUtil = require('../../util/response-util/response-util');
            let serverResponse = responseUtil.extractResponse(res);
            callBack(serverResponse);
        })
        .catch(function (err) {

            response.clientValidations.push(ErrorMessages.Err0000());
            callBack(response);
        });
    }
}