
import React from 'react'
import { Text } from 'react-native'
import { createDrawerNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import HabitList from './HabitList';
import MyList from './MyList';
import HomeScreen from './Home';
import DailyRoutine from './DailyRoutine';
import LoginScreen from './Login';
import CalendarScreen from './Calendar';

const Drawer = createDrawerNavigator({
    Home: { screen: HomeScreen },
    List: { screen: HabitList },
    MyList: { screen: MyList },
    Routine: { screen: DailyRoutine },
    Calendar: { screen: CalendarScreen }
})

const ScreenNavigator = createStackNavigator({
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

const MainNavigator = createSwitchNavigator({
    Login: { name: 'Login', screen: LoginScreen },
    Navigator: { name: 'Navigator', screen: ScreenNavigator }
}, {
    initialRouteName: 'Login',
    headerMode: 'none'
});

export default MainNavigator