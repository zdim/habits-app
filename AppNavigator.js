
import React from 'react'
import { Text } from 'react-native'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import HabitList from './HabitList';
import MyList from './MyList';
import HomeScreen from './Home';
import DailyRoutine from './DailyRoutine';

const Drawer = createDrawerNavigator({
    Home: { screen: HomeScreen },
    List: { screen: HabitList },
    MyList: { screen: MyList },
    Routine: { screen: DailyRoutine }
})

const Navigator = createStackNavigator({
    Drawer: { name: 'Drawer', screen: Drawer }
}, {
    navigationOptions: ({navigation}) => ({
        headerStyle: { backgroundColor: 'teal' },
        title: 'Habits',
        headerTintColor: 'white',
        headerLeft: <Text onPress={() => navigation.toggleDrawer()}>Menu</Text>
      })
    }
);

export default Navigator