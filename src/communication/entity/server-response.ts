export class ServerResponse{

    isSuccessful:Boolean=false;
    message: String = "";
    outputType:String="";
    outputJson:String="";
    operationTimestamp:Date=new Date();    
}