import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default class CalendarScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Calendar'
      };

    render() {
        return (
            <View>
                <Calendar />
            </View>
        );
    }
}