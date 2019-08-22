import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import HabitList from "./Views/HabitList";
import HabitDetail from "./Views/HabitDetail";
import HomeScreen from "./Views/Home";
import DailyRoutine from "./Views/DailyRoutine";
import RoutineEvent from "./Views/RoutineEvent";
import LoginScreen from "./Views/Login";
import CalendarScreen from "./Views/Calendar";
import TimePicker from "./Views/TimePicker";

const getNavOptions = title => ({
  headerStyle: { backgroundColor: "#007F10" },
  title: title,
  headerTintColor: "white",
  headerBackTitle: null
});

const RoutineNavigator = createStackNavigator(
  {
    Routine: { screen: DailyRoutine },
    RoutineEvent: { screen: RoutineEvent },
    TimePicker: { screen: TimePicker }
  },
  {
    navigationOptions: getNavOptions("My Routine")
  }
);

const HabitNavigator = createStackNavigator(
  {
    HabitList: { screen: HabitList },
    HabitDetail: { screen: HabitDetail }
  },
  {
    navigationOptions: getNavOptions("My Habits")
  }
);

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

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeNavigator
  },
  Habits: {
    screen: HabitNavigator
  },
  Routine: {
    screen: RoutineNavigator
  },
  Calendar: {
    screen: CalendarNavigator
  }
});

const MainNavigator = createSwitchNavigator(
  {
    Login: { name: "Login", screen: LoginScreen },
    Navigator: { name: "Navigator", screen: TabNavigator }
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default MainNavigator;
