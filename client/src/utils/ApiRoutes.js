// export const HOST = "http://localhost:5000";
export const HOST = "http://localhost:5000";

// export const CHECK_USER = `${HOST}/api/auth/check-user`;
const AUTH_ROUTE = `${HOST}/api/auth`;
export const CHECK_USER = `${AUTH_ROUTE}/check-user`;
export const ONBOARD_USER = `${AUTH_ROUTE}/onboard-user`;
export const GET_ALL_CONTACTS = `${AUTH_ROUTE}/get-contacts`;


