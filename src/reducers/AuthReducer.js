import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGGING_USER,
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error:'',
  loading: false
}

export default (state=INITIAL_STATE, action) => {
  console.log(action)
  switch(action.type) {
    case EMAIL_CHANGED: {
      return { ...state, email: action.payload }
    }
    case PASSWORD_CHANGED: {
      return { ...state, password: action.payload }
    }

    case LOGGING_USER: {
      return { ...state, loading: true, error:'' }
    }

    case LOGIN_USER_SUCCESS: {
      return { ...state, user: action.payload, loading: false, error:'', password:'' }
    }

    case LOGIN_USER_FAIL: { // if login fails, change error, and clear password
      return { ...state, error:'Authentication Failed', loading: false, password:'' }
    }

    default: return state;
  }
}
