export default class Response {

    isSuccessful:Boolean=false;

    clientValidations = new Array<String>();
    serverValidations = new Array<String>();
 
    outputType:String="";
    outputJson:String="";
    operationTimestamp:Date=new Date();    
}