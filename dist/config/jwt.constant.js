"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.jwtConstants = {
    secret: process.env.JWT_SECRET,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
    twilioVerificationServiceSID: process.env.TWILIO_VERIFICATION_SERVICE_SID,
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
};
//# sourceMappingURL=jwt.constant.js.map