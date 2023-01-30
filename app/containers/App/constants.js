/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
export const UGROOPSTORE_KEY_PREFIX = 'UGroopStorage:';
export const USERLOGOUT = 'USER_LOGOUT';
export const USERLOGIN = 'USER_LOGIN';
export const REFRESH_TOKEN_EXPIRY = 'REFRESH_TOKEN_EXPIRY';
export const RESET_GLOBAL_ERROR = 'RESET_GLOBAL_ERROR';
