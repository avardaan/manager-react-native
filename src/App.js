import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import firebase from 'firebase';
import reducers from './reducers';
import LoginForm from './components/LoginForm';

class App extends Component {

  componentWillMount() {
    // firebase setup
    const config = {
    apiKey: "AIzaSyADG3V0b5dk_trG5wdM3Ur-H0aY25CWbwc",
    authDomain: "manager-6cf5f.firebaseapp.com",
    databaseURL: "https://manager-6cf5f.firebaseio.com",
    projectId: "manager-6cf5f",
    storageBucket: "manager-6cf5f.appspot.com",
    messagingSenderId: "538785704042"
  };
  firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <LoginForm />
      </Provider>
    )
  }
}

export default App
