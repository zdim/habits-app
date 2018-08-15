import React from 'react';
import { StyleSheet, View, StatusBar, Text } from 'react-native';
import HabitList from './HabitList';
import MyList from './MyList';
import HomeScreen from './Home';
import DailyRoutine from './DailyRoutine';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import AppNavigator from './AppNavigator';

const DrawerStack = createDrawerNavigator({
  Home: HomeScreen,
  List: HabitList,
  MyList: MyList,
  Routine: DailyRoutine
})

const RootStack = createStackNavigator({
    Drawer: DrawerStack
  }, {
    initialRouteName: 'Drawer',
    navigationOptions: ( {navigation} ) => ({
      headerStyle: { backgroundColor: 'green' },
      headerTintColor: '#fff',
      title: 'Habits1'
    })
  }
);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        
        <RootStack />
      </View>);
  }
}

const styles = StyleSheet.create({
  header: {
      alignItems: 'flex-start'
  },
  container: {
      flex: 1,
      backgroundColor: '#eaf0f9'
  },
  title: {
      fontSize: 24,
      paddingTop: 12,
      paddingBottom: 12
  }
});