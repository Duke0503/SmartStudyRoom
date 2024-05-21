"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSuccess = exports.ResponseError = void 0;
class ResponseError {
    constructor(infoMessage, data) {
        this.success = false;
        this.message = infoMessage;
        this.data = data;
        console.warn(new Date().toString() + ' - [Response]: ' + infoMessage + (data ? ' - ' + JSON.stringify(data) : ''));
    }
    ;
}
exports.ResponseError = ResponseError;
class ResponseSuccess {
    constructor(infoMessage, data, notLog) {
        this.success = true;
        this.message = infoMessage;
        this.data = data;
        if (!notLog) {
            try {
                var offuscateRequest = JSON.parse(JSON.stringify(data));
                if (offuscateRequest && offuscateRequest.token)
                    offuscateRequest.token = "*******";
                console.log(new Date().toString() + ' - [Response]: ' + JSON.stringify(offuscateRequest));
            }
            catch (error) { }
        }
        ;
    }
    ;
}
exports.ResponseSuccess = ResponseSuccess;
//# sourceMappingURL=response.dto.js.map