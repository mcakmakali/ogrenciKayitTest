import React, { Component } from 'react';
import { View, Text } from 'react-native';
import  { Provider } from 'react-redux';
import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers/';
import LoginFrom from './src/components/LoginForm';

class Main extends Component {

  componentWillMount(){
      firebase.initializeApp({
        apiKey: 'AIzaSyB6XIXNJr-Bjal4U686kxPOzj-RhrS-kqU',
        authDomain: 'ogrenci-13aee.firebaseapp.com',
        databaseURL: 'https://ogrenci-13aee.firebaseio.com',
        projectId: 'ogrenci-13aee',
        storageBucket: 'ogrenci-13aee.appspot.com',
        messagingSenderId: '924592666004'
    });
  }

  render(){
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{ marginTop:21}}>
        <LoginFrom />
        </View>
      </Provider>
    );
  };
}


export default Main;
