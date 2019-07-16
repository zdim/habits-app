require('./polyfill');
import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, View, StatusBar } from 'react-native';
import MainNavigator from './Components/AppNavigator';
import { FIREBASE_KEY } from 'react-native-dotenv';

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: "habits-9ad15.firebaseapp.com",
  databaseURL: "https://habits-9ad15.firebaseio.com",
  storageBucket: "gs://habits-9ad15.appspot.com"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />        
        <MainNavigator screenProps={{firebase: firebaseApp}}/>
      </View>);
  }
}

const styles = StyleSheet.create({
  header: {
      alignItems: 'flex-start'
  },
  container: {
      flex: 1,
      backgroundColor: '#eaf0f9'
  },
  title: {
      fontSize: 24,
      paddingTop: 12,
      paddingBottom: 12
  }
});