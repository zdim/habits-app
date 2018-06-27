import React from 'react';
import HabitList from './HabitList';
import Home from './Home';
import { createDrawerNavigator } from 'react-navigation';

const RootStack = createDrawerNavigator({
    Home: Home,
    List: HabitList,
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}