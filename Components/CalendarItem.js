import React, { useState, useEffect } from "react";
import { View, TouchableHighlight, StyleSheet, Text } from "react-native";

const CalendarItem = ({ item, eventPressed, selectedDate }) => {
  const styles = StyleSheet.create({
    item: {
      backgroundColor: "white",
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 10
    },
    completedItem: {
      backgroundColor: "green",
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 10
    },
    freeTimeItem: {
      backgroundColor: "#eee",
      borderColor: "#ccc",
      borderWidth: 2,
      borderStyle: "dotted",
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 10
    }
  });

  var [style, setStyle] = useState(styles.item);

  useEffect(() => {
    if (item[1].daysCompleted && item[1].daysCompleted.includes(selectedDate)) {
      setStyle(styles.completedItem);
    } else if(item[0] == "Free Time") {
        setStyle(styles.freeTimeItem);
    } else {
        setStyle(styles.item);
    }
  });

  formatTime = time => {
    var [hours, minutes] = time.split(":");
    if(hours > 12) {
        return `${hours - 12}:${minutes} PM`
    } else {
        return `${parseInt(hours)}:${minutes} ${+hours == 12 ? 'PM' : 'AM'}`
    }
  }

  return (
    <TouchableHighlight style={style} onPress={e => eventPressed(item)}>
      <View style={{ display: "flex" }}>
        <View>
          <Text>{formatTime(item[1].startTime)}</Text>
          <Text>{item[1].name}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default CalendarItem;
