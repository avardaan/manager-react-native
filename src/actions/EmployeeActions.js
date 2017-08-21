import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
} from './types';


export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  }
}

export const employeeCreate = ({ name, phone, shift }) => {
  // access currently authenticated user
  const currentUser = firebase.auth().currentUser;
  // access/modify database. use backticks to inject JS variable as string
  // push the newly created employee object to user/uid/employees
  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/employees`)
    .push({ name, phone, shift })
      .then( () => {
        dispatch({ type: EMPLOYEE_CREATE })
        Actions.pop({ type:'reset' }) // reset, resets the nav stack, so there isn't a back button on the next screen
    })
  }
  // returned function instead of object. didn't use dispatch because
  // we don't need this action to do anything in the app - change state
  // or summat. we just wanted to push some data to firebase and we
  // did that. but we still need to return something from this action
  // so we return this function that goes to redux-thunk
  // but because it doesn't have dispatch, it never actually gets sent
  // to the reducers
}
/*
export const employeesFetch = () => {
  const currentUser = firebase.auth().currentUser;
  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/employees`)
    // .on watches for data changes in firebase. runs throughout the life
    // of the app and runs to fetch that data
    .on('value')
      .then( () => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() }) // snapshot.val() is the actual data we get from firebase )
      })
      .catch( (error) => console.log(error) )
  }
}
*/

export const employeesFetch = () => {
  const currentUser = firebase.auth().currentUser;
  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/employees`)
    .on('value', (snapshot) => {
      // snapshot.val() is the data we get from firebase, i.e.
      // an object of objects. not an array.
      dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() })
    })
  }
}
