import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Agenda } from "react-native-calendars";
import CalendarItem from "./CalendarItem";
import { getLocalTimeFormatted, getCurrentTime } from "../../utils/helpers";

export default class CalendarScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: {},
      combinedItems: {},
      habits: null,
      freeTime: [],
      pressedEvent: null,
      selectedDate: getLocalTimeFormatted(),
    };
    var subscriptions = [];
    this.eventPressed.bind(this);
  }

  static navigationOptions = {
    drawerLabel: "Calendar"
  };

  getCalendarEvents() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          "2019-07-31": [
            [
              "1",
              {
                name: "Event 1",
                startTime: "09:00",
                endTime: "10:00"
              }
            ],
            [
              "2",
              {
                name: "Event 2",
                startTime: "12:00",
                endTime: "13:30"
              }
            ],
            [
              "3",
              {
                name: "Event 3",
                startTime: "18:00",
                endTime: "19:00"
              }
            ]
          ]
        });
      }, 1000);
    });
  }

  getEventsAndHabits = () => {
    const uid = this.props.screenProps.firebase.auth().currentUser.uid;
    const getHabits = this.props.screenProps.firebase
      .database()
      .ref("events/" + uid)
      .once("value");
    const getEvents = this.getCalendarEvents();
    Promise.all([getHabits, getEvents])
      .then(responses => {
        let habits = Object.entries(responses[0].val());
        this.setState({
          habits: habits,
          events: responses[1],
          combinedItems: this.buildItemsList(habits, responses[1])
        });
      })
      .catch(err => console.log("error building state", err));
  };

  componentDidMount() {
    const nav = this.props.navigation;

    subscriptions = [
      nav.addListener("willFocus", payload => {
        this.getEventsAndHabits();
      }),
      nav.addListener("didBlur", payload => {
        this.setState({ combinedItems: {} })
      })
    ]
  }

  componentWillUnmount() {
    subscriptions.forEach(n => n.remove());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.pressedEvent) {
      const event = this.state.habits.find(
        h => h[0] == this.state.pressedEvent
      );
      if(!event) return;
      const daysCompleted = event[1].daysCompleted;
      const uid = this.props.screenProps.firebase.auth().currentUser.uid;
      this.props.screenProps.firebase
        .database()
        .ref(`events/${uid}/${this.state.pressedEvent}/daysCompleted`)
        .set(daysCompleted)
        .then(() => {})
        .catch(e => {
          console.log(e.message);
        });
      this.setState({ pressedEvent: null });
    }
  }

  buildItemsList(habits, events, date = this.state.selectedDate) {
    let eventsSelectedDate = events[date] ? [...events[date]] : [];
    let combinedItemsForSelectedDate = eventsSelectedDate.concat(habits);
    let sortedItems = combinedItemsForSelectedDate.sort(
      (a, b) =>
        new Date("1970/01/01 " + a[1].startTime) -
        new Date("1970/01/01 " + b[1].startTime)
    );

    // if selected date is in the past we don't add free time
    const dateComparer = new Date(date) - new Date(getLocalTimeFormatted());
    if (dateComparer < 0) {
      return { [date]: sortedItems };
    }

    // in here we'll add the "free time" items that can be pressed and converted into habits
    var itemsWithFreeTime = [sortedItems[0]];

    for (let i = 0; i < sortedItems.length - 1; i++) {
      const currentItemEnd = sortedItems[i][1].endTime;
      const nextItemStart = sortedItems[i + 1][1].startTime;
      const minuteDifference =
        this.getMinutesSinceMidnight(nextItemStart) -
        this.getMinutesSinceMidnight(currentItemEnd);
      if (minuteDifference >= 60) {
        const freeTimeBlock = [
          "Free Time",
          {
            name: "Free Time",
            startTime: currentItemEnd,
            endTime: nextItemStart
          }
        ];
        itemsWithFreeTime.push(freeTimeBlock, sortedItems[i + 1]);
      } else {
        itemsWithFreeTime.push(sortedItems[i + 1]);
      }
    }

    return { [date]: itemsWithFreeTime };
  }

  getMinutesSinceMidnight(time) {
    var c = time.split(":");
    return parseInt(c[0]) * 60 + parseInt(c[1]);
  }

  onDayChanged(day) {
    console.log(day);
    this.setState({
      selectedDate: day.dateString,
      combinedItems: this.buildItemsList(
        this.state.habits,
        this.state.events,
        day.dateString
      )
    });
  }

  render() {
    return (
      <Agenda
        items={this.state.combinedItems}
        //loadItemsForMonth={this.loadItems.bind(this)}
        selected={this.state.selectedDate}
        renderItem={item => (
          <CalendarItem
            item={item}
            eventPressed={this.eventPressed.bind(this)}
            selectedDate={this.state.selectedDate}
          />
        )}
        //renderEmptyData={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        onDayPress={this.onDayChanged.bind(this)}
        //renderDay={(day, item) => (<Text>{day ? day.day : item.name}</Text>)}
      />
    );
  }

  // loadItems(day) {
  //     setTimeout(() => {
  //       for (let i = -15; i < 85; i++) {
  //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //         const strTime = this.timeToString(time);
  //         if (!this.state.items[strTime]) {
  //           this.state.items[strTime] = [];
  //           const numItems = Math.floor(Math.random() * 5);
  //           for (let j = 0; j < numItems; j++) {
  //             this.state.items[strTime].push({
  //               name: 'Item for ' + strTime,
  //               height: Math.max(50, Math.floor(Math.random() * 150))
  //             });
  //           }
  //         }
  //       }
  //       //console.log(this.state.items);
  //       const newItems = {};
  //       Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
  //       this.setState({
  //         items: newItems
  //       });
  //     }, 1000);
  //     // console.log(`Load Items for ${day.year}-${day.month}`);
  //   }

  eventPressed(item) {
    var newItem = [...item];
    if (newItem[1]) {
      if (!newItem[1].daysCompleted) {
        newItem[1].daysCompleted = [this.state.selectedDate];
      } else {
        let dateIndex = newItem[1].daysCompleted.indexOf(
          this.state.selectedDate
        );
        if (dateIndex > -1) {
          newItem[1].daysCompleted.splice(dateIndex, 1);
        } else {
          newItem[1].daysCompleted.push(this.state.selectedDate);
        }
      }
      const index = this.state.habits.findIndex(h => h[0] === item[0]);
      let newHabits = Object.assign([...this.state.habits], { index: newItem });
      this.setState({
        habits: newHabits,
        pressedEvent: newItem[0],
        combinedItems: this.buildItemsList(newHabits, this.state.events)
      });
    } else {
      console.log(`event ${itemData.name} not found`);
    }
  }

  getHeight(item) {
    const end = item.endTime.split(":");
    const start = item.startTime.split(":");
    const minuteDifference =
      +end[0] * 60 + +end[1] - (+start[0] * 60 + +start[1]);
    return minuteDifference;
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});
