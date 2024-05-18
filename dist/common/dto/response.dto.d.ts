import { IResponse } from '../interfaces/response.interface';
export declare class ResponseError implements IResponse {
    constructor(infoMessage: string, data?: any);
    message: string;
    data: any[];
    errorMessage: any;
    error: any;
    success: boolean;
}
export declare class ResponseSuccess implements IResponse {
    constructor(infoMessage: string, data?: any, notLog?: boolean);
    message: string;
    data: any[];
    errorMessage: any;
    error: any;
    success: boolean;
}
