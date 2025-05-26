// export const HOST = "http://localhost:5000";
export const HOST = "http://localhost:5000";

// export const CHECK_USER = `${HOST}/api/auth/check-user`;
const AUTH_ROUTE = `${HOST}/api/auth`;
const MESSAGE_ROUTE = `${HOST}/api/messages`;
export const CHECK_USER = `${AUTH_ROUTE}/check-user`;
export const ONBOARD_USER = `${AUTH_ROUTE}/onboard-user`;
export const GET_ALL_CONTACTS = `${AUTH_ROUTE}/get-contacts`;



export const ADD_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/add-message`;
export const GET_MESSAGES_ROUTE =  `${MESSAGE_ROUTE}/get-messages`;
export const ADD_IMAGE_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/add-image-message`


