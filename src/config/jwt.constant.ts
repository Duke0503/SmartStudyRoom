import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
  twilioVerificationServiceSID: process.env.TWILIO_VERIFICATION_SERVICE_SID,
  twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
}