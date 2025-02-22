const AUTH_ACTION_TYPES = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  SIGNUP_REQUEST: 'SIGNUP_REQUEST',
  REFRESH_AUTH_REQUEST: 'REFRESH_AUTH_REQUEST',

  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_REQUEST_SUCCESS: 'AUTH_REQUEST_SUCCESS',
  AUTH_REQUEST_FAILED: 'AUTH_REQUEST_FAILED',

  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_REQUEST_SUCCESS: 'LOGOUT_REQUEST_SUCCESS',
  LOGOUT_REQUEST_FAILED: 'LOGOUT_REQUEST_FAILED',

  PASSWORD_VERIFICATION: 'PASSWORD_VERIFICATION',
  RESTORE_PASSWORD: 'RESTORE_PASSWORD',
  RESTORE_PASSWORD_REQUEST: 'RESTORE_PASSWORD_REQUEST',
  RESTORE_PASSWORD_REQUEST_SUCCESS: 'RESTORE_PASSWORD_REQUEST_SUCCESS',
  RESTORE_PASSWORD_REQUEST_FAILED: 'RESTORE_PASSWORD_REQUEST_FAILED',

};

export default AUTH_ACTION_TYPES;
