// src/store/reducers.ts

import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from './actions';

interface AuthState {
  loading: boolean;
  user: any;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state, loading: true, error: null};
    case LOGIN_SUCCESS:
      return {...state, loading: false, user: action.payload, error: null};
    case LOGIN_FAILURE:
      return {...state, loading: false, user: null, error: action.payload};
    default:
      return state;
  }
};

export default authReducer;
