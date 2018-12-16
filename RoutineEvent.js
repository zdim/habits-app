import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TimePickerAndroid, DatePickerIOS, Platform } from 'react-native';
import TimePicker from './TimePicker';

export default class RoutineEvent extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            startTime: '00:00',
            endTime: '00:00',
            showStartTimePicker: false,
            showEndTimePicker: false
        };
    }

    saveEvent = () => {
        const uid = this.props.screenProps.firebase.auth().currentUser.uid;
        this.props.screenProps.firebase.database().ref('events/' + uid).push({
            name: this.state.name,
            startTime: this.state.startTime,
            endTime: this.state.endTime
        }).then(() => {
            this.props.navigation.goBack(); 
        }).catch((e) => { console.log(e.message); });
    }

    openStartTimePicker = () => {
        this.setState({showStartTimePicker: true})
    }

    openEndTimePicker = () => {
        this.setState({showEndTimePicker: true})
    }

    closeTimePicker = () => {
        this.setState({showStartTimePicker: false, showEndTimePicker: false})
    }

    saveTime = (time) => {
        if(this.state.showStartTimePicker) {
            this.setState({startTime: time})
        } else {
            this.setState({endTime: time})
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>New Event</Text>
                {!(this.state.showStartTimePicker || this.state.showEndTimePicker) ? 
                <View>
                    <TextInput style={styles.textFields}
                        placeholder='Name'
                        onChangeText={(text) => this.setState({name: text})}/>
                    <View style={styles.dateBox}>
                        <Text onPress={() => {this.openStartTimePicker()}}>{this.state.startTime}</Text>
                    </View>
                    <View style={styles.dateBox}>
                        <Text onPress={() => {this.openEndTimePicker()}}>{this.state.endTime}</Text>                               
                    </View>
                    <View style={styles.buttons}>
                        <Button
                            onPress={() => this.saveEvent()}
                            title='Save'
                            color='blue' />
                        <Button
                            onPress={() => this.props.navigation.goBack()}
                            title='Cancel'
                            color='grey' />
                    </View>
                </View>
                    : <TimePicker 
                        closePicker={this.closeTimePicker}
                        saveTime={this.saveTime}/>}
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
    dateBox: {
        backgroundColor: 'white',
        height: 60,
        paddingTop: 20,
        width: '80%'
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