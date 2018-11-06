import React from 'react';
import { View } from 'react-native';

export default class Day extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [
                {
                    time: '7:00',
                    title: 'AM Routine'
                },
                {
                    time: '7:30',
                    title: 'Podcast'
                },
                {
                    time: '9:00',
                    title: 'Workout'
                },
                {
                    time: '12:00',
                    title: 'Workout'
                }
            ]
        };
    }

    render() {
        return (
            <View>
                
            </View>
        );    
    }
}