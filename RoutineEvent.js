import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default class RoutineEvent extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            startTime: '',
            endTime: ''
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

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>New Event</Text> 
                <TextInput style={styles.textFields}
                    placeholder='Name'
                    onChangeText={(text) => this.setState({name: text})}/>
                <TextInput style={styles.textFields}
                    placeholder='Start Time'
                    onChangeText={(text) => this.setState({startTime: text})}/>
                <TextInput style={styles.textFields}
                    placeholder='End Time'
                    onChangeText={(text) => this.setState({endTime: text})}/>
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eaf0f9',
      alignItems: 'center',
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