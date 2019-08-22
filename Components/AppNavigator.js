import React from "react";
import { Image, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import HabitList from "./Views/HabitList";
import HabitDetail from "./Views/HabitDetail";
import HomeScreen from "./Views/Home";
import DailyRoutine from "./Views/DailyRoutine";
import RoutineEvent from "./Views/RoutineEvent";
import LoginScreen from "./Views/Login";
import CalendarScreen from "./Views/Calendar";
import TimePicker from "./Views/TimePicker";

const getNavOptions = title => {
  return ({ navigation }) => ({
    headerStyle: { backgroundColor: "#007F10", height: 50 },
    title: title,
    headerTitleStyle: { fontSize: 24 },
    headerTintColor: "white",
    headerLeft: (
      <TouchableOpacity style={{paddingLeft: 20}} onPress={() => navigation.toggleDrawer()}>
        <Image source={require("../resources/icons/menu.png")} />
      </TouchableOpacity>
    )
  });
};

const RoutineNavigator = createStackNavigator({
  Routine: {
    screen: DailyRoutine,
    navigationOptions: getNavOptions("My Routine")
  },
  RoutineEvent: { screen: RoutineEvent },
  TimePicker: { screen: TimePicker }
});

const HabitNavigator = createStackNavigator({
  HabitList: {
    screen: HabitList,
    navigationOptions: getNavOptions("My Habits")
  },
  HabitDetail: { screen: HabitDetail }
});

const CalendarNavigator = createStackNavigator({
  Calendar: {
    screen: CalendarScreen,
    navigationOptions: getNavOptions("Calendar")
  }
});

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: getNavOptions("Habits")
  }
});

const Drawer = createDrawerNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: { drawerLabel: "Home" }
  },
  Habits: {
    screen: HabitNavigator,
    navigationOptions: { drawerLabel: "My Habits" }
  },
  Routine: {
    screen: RoutineNavigator,
    navigationOptions: { drawerLabel: "Routine" }
  },
  Calendar: {
    screen: CalendarNavigator,
    navigationOptions: { drawerLabel: "Calendar" }
  }
});

const MainNavigator = createSwitchNavigator(
  {
    Login: { name: "Login", screen: LoginScreen },
    Navigator: { name: "Navigator", screen: Drawer }
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default MainNavigator;
