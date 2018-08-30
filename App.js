import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, View, StatusBar } from 'react-native';
import AppNavigator from './AppNavigator';

const firebaseConfig = {
  apiKey: "AIzaSyCX0-WZmaG_aL6HEfmnn7cj4RS_JNp-fPE",
  authDomain: "habits-9ad15.firebaseapp.com",
  databaseURL: "https://habits-9ad15.firebaseio.com",
  storageBucket: ""
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />        
        <AppNavigator />
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