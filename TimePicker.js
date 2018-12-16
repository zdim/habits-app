import React from 'react';
import { View, StyleSheet, TimePickerAndroid, DatePickerIOS, Button, Platform } from 'react-native';

export default class TimePicker extends React.Component {
    constructor() {
        super();
        this.state = {
            time: new Date()
        };
    }

    savePicker = () => {
        console.log(this.state.time);
        this.props.saveTime(this.state.time.getHours() + ':' + this.state.time.getMinutes());
        this.props.closePicker();
    }

    onDateChange = (date) => {
        this.setState({time: date});
    }

    render() {
        return (
            <View>
                <DatePickerIOS
                    date={this.state.time}
                    mode={'time'}
                    minuteInterval={15}
                    onDateChange={this.onDateChange} />
                <View style={styles.buttons}>
                    <Button
                        onPress={() => this.savePicker()}
                        title='Save'
                        color='blue' />
                    <Button
                        onPress={() => this.props.closePicker()}
                        title='Cancel'
                        color='grey' />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eaf0f9',
      justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        paddingBottom: 40
    },
    textFields: {
        width: '80%',
        height: 40,
        fontSize: 16,
        paddingBottom: 20
    },
    buttons: {
        width: '80%',
        height: 60,
        paddingTop: 20
    }
});
