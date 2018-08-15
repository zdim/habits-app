import React from 'react'
import { Text } from 'react-native'
import {createStackNavigator} from 'react-navigation';
import HomeScreen from './Home';
import HabitList from './HabitList';

const Navigator = createStackNavigator({
    Home: { screen: HomeScreen },
    HabitList: { screen: HabitList }
}, {
    // Default
    headerMode: 'float',
    initialRouteName: 'Home',
    navigationOptions: ({navigation}) => ({
        headerStyle: {backgroundColor: 'white'},
        title: 'Habits',
        headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
      })
})

export default Navigator