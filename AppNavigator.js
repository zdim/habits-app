
import React from 'react'
import { Text } from 'react-native'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import HabitList from './HabitList';
import MyList from './MyList';
import HomeScreen from './Home';
import DailyRoutine from './DailyRoutine';
import LoginScreen from './Login';

const Drawer = createDrawerNavigator({
    Home: { screen: HomeScreen },
    List: { screen: HabitList },
    MyList: { screen: MyList },
    Routine: { screen: DailyRoutine }
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

const MainNavigator = createStackNavigator({
    Login: { name: 'Login', screen: LoginScreen },
    Navigator: { name: 'Navigator', screen: ScreenNavigator }
});

export default MainNavigator