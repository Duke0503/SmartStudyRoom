"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenExpired = exports.getExpiry = void 0;
const moment = require("moment");
const getExpiry = () => {
    const createdAt = new Date();
    const expiresAt = moment(createdAt).add(5, 'minutes').toDate();
    return expiresAt;
};
exports.getExpiry = getExpiry;
function isTokenExpired(expiry) {
    const expirationDate = new Date(expiry);
    const currentDate = new Date();
    return expirationDate.getTime() <= currentDate.getTime();
}
exports.isTokenExpired = isTokenExpired;
//# sourceMappingURL=dateTimeUltility.js.map