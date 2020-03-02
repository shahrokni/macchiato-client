"use strict";
exports.__esModule = true;
var Response = /** @class */ (function () {
    function Response() {
        this.isSuccessful = false;
        this.clientValidations = new Array();
        this.serverValidations = new Array();
        this.outputType = "";
        this.outputJson = "";
        this.operationTimestamp = new Date();
    }
    return Response;
}());
exports["default"] = Response;
