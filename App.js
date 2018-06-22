import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HabitList from './HabitList';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Habits
        </Text>
        <HabitList/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf0f9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  title: {
    fontSize: 24,
    paddingTop: 12,
    paddingBottom: 12
  }
});