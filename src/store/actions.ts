// src/store/actions.ts

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = (email: string, password: string) => ({
  type: LOGIN_REQUEST,
  payload: {email, password},
});

export const loginSuccess = (user: any) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
