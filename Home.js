import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        title: 'Home Home'
      };
      
  render() {
    return (
        <Text onPress={() => this.props.navigation.toggleDrawer()}>Menu</Text>
    );
  }
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'flex-start'
    },
    container: {
        flex: 1,
        backgroundColor: '#eaf0f9',
        paddingTop: 20
    },
    title: {
        fontSize: 24,
        paddingTop: 12,
        paddingBottom: 12
    }
});