import React from 'react';
import { View, Text } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        title: 'Home Home'
      };
      
  render() {
    return (
      <View>
        <Text>HOME PAGE</Text>
        </View>
    );
  }
}