import firebase from 'firebase'

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGGING_USER
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

/*
the dispatch method is usually run automatically behind the scenes
when we return an object from an action. check emailChanged for example.
But with redux thunk we have the option of controlling when the dispatch
method is run, by manually returning IT instead of the final object.
by deciding when we run dispatch ourselves, we can control WHEN the
action is sent to the reducers. this allows us to wait for
promises to resolve and then send the action to reducers
*/
export const loginUser = ({email, password}) => {
  const toDispatch = (dispatch) => {
    dispatch({ type: LOGGING_USER })

    firebase.auth().signInWithEmailAndPassword(email, password) // returns promise
      .then((user) => loginUserSuccess(dispatch, user))
      .catch((user) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((user) => loginUserSuccess(dispatch, user))
          .catch((user) => loginUserFail(dispatch))
      })
    }
  return toDispatch;
}

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL })
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
}
