"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
const generateOTP = (n) => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < n; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
};
exports.generateOTP = generateOTP;
//# sourceMappingURL=codeGenerator.js.map