import React from 'react';
import { Text, View } from 'react-native';

export default class DailyRoutine extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Routine'
      };

    render() {
        return (
            <View>
            <Text onPress={() => this.props.navigation.toggleDrawer()}>Menu</Text>
            <Text>This is the daily routine</Text>
            </View>
        );
    }
}