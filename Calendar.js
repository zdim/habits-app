import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default class CalendarScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          items: {
            '2018-10-29': [{
                name: "Event 1",
                date: '2018-10-29',
                startTime: '09:00',
                endTime: '10:00'
            },
            {
                name: "Event 2",
                date: '2018-10-29',
                startTime: '12:00',
                endTime: '13:30'
            },
            {
                name: "Event 3",
                date: '2018-10-29',
                startTime: '18:00',
                endTime: '19:00'
            }]
          }
        };
    }

    static navigationOptions = {
        drawerLabel: 'Calendar'
      };

    render() {
        return (
            <View style={{height: 600}}>
                <Agenda
                    items={this.state.items}
                    //loadItemsForMonth={this.loadItems.bind(this)}
                    selected={'2018-10-29'}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    // markingType={'period'}
                    // markedDates={{
                    //    '2017-05-08': {textColor: '#666'},
                    //    '2017-05-09': {textColor: '#666'},
                    //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                    //    '2017-05-21': {startingDay: true, color: 'blue'},
                    //    '2017-05-22': {endingDay: true, color: 'gray'},
                    //    '2017-05-24': {startingDay: true, color: 'gray'},
                    //    '2017-05-25': {color: 'gray'},
                    //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                     // monthFormat={'yyyy'}
                     // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                    //renderDay={(day, item) => (<Text>{day ? day.day : 'item'}</Text>)}
                    />
            </View>
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
    
      renderItem(item) {
        return (
            <View style={[styles.item, {height: this.getHeight(item)}]}>
                <Text>{item.startTime}</Text>
                <Text>{item.name}</Text>
            </View>
        );
      }
    
      getHeight(item) {
          const end = item.endTime.split(':');
          const start = item.startTime.split(':');
          const minuteDifference = ((+end[0]) * 60 + (+end[1])) - ((+start[0]) * 60 + (+start[1]));
          return minuteDifference * 1.5;
      }

      renderEmptyDate() {
        return (
          <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
      }
    
      rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
      }
    
      timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
      }
    }
    
    const styles = StyleSheet.create({
      item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
      },
      emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
      }
    });

