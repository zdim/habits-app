import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import AppNavigator from './AppNavigator';

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