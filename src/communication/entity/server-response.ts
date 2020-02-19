export class ServerResponse{

    isSuccessful:Boolean=false;
    messageCode: String = "";
    outputType:String="";
    outputJson:String="";
    operationTimestamp:Date=new Date();    
}