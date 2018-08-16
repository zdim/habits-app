import React from 'react';
import { Text } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        title: 'Home Home'
      };
      
  render() {
    return (
        <Text>HOME PAGE</Text>
    );
  }
}