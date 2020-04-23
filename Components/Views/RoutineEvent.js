import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TimePickerAndroid,
  DatePickerIOS,
  Platform
} from "react-native";
import TimePicker from "./TimePicker";

const RoutineEvent = ({ navigation, screenProps }) => {
  var [id, setId] = useState(navigation.getParam("id", null));
  var [name, setName] = useState(navigation.getParam("name", ""));
  var [startTime, setStartTime] = useState(navigation.getParam("startTime", "00:00"));
  var [endTime, setEndTime] = useState(navigation.getParam("endTime", "00:00"));
  var [showEndTimePicker, setShowEndTimePicker] = useState(false);
  var [showStartTimePicker, setShowStartTimePicker] = useState(false);

  saveEvent = () => {
    const firebase = screenProps.firebase;
    const uid = firebase.auth().currentUser.uid;
    if (id) {
      firebase
        .database()
        .ref("events/" + uid + "/" + id)
        .set({
          name: name.trim(),
          startTime: startTime,
          endTime: endTime
        })
        .then(() => {
          navigation.goBack();
        })
        .catch(e => {
          console.log(e.message);
        });
    } else {
      firebase
        .database()
        .ref("events/" + uid)
        .push({
          name: name.trim(),
          startTime: startTime,
          endTime: endTime
        })
        .then(() => {
          navigation.goBack();
        })
        .catch(e => {
          console.log(e.message);
        });
    }
  };

  openStartTimePicker = () => {
    setShowStartTimePicker(true);
  };

  openEndTimePicker = () => {
    setShowEndTimePicker(true);
  };

  closeTimePicker = () => {
    setShowStartTimePicker(false);
    setShowEndTimePicker(false);
  };

  saveTime = time => {
    showStartTimePicker ? setStartTime(time) : setEndTime(time);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Event</Text>
      {!(showStartTimePicker || showEndTimePicker) ? (
        <View>
          <TextInput
            style={styles.textFields}
            placeholder="Name"
            onChangeText={setName}
          >
            {name}
          </TextInput>
          <View style={styles.dateBox}>
            <Text onPress={openStartTimePicker}>
              {startTime}
            </Text>
          </View>
          <View style={styles.dateBox}>
            <Text onPress={openEndTimePicker}>
              {endTime}
            </Text>
          </View>
          <View style={styles.buttons}>
            <Button
              onPress={saveEvent}
              title="Save"
              color="blue"
            />
            <Button
              onPress={navigation.goBack}
              title="Cancel"
              color="grey"
            />
          </View>
        </View>
      ) : (
        <TimePicker
          closePicker={closeTimePicker}
          saveTime={saveTime}
          selectedTime={
            showStartTimePicker
              ? startTime
              : endTime
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {},
  container: {
    flex: 1,
    backgroundColor: "#eaf0f9",
    justifyContent: "center"
  },
  dateBox: {
    backgroundColor: "white",
    height: 60,
    paddingTop: 20,
    width: "80%"
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    paddingBottom: 40
  },
  textFields: {
    width: "80%",
    height: 40,
    fontSize: 16,
    paddingBottom: 20
  },
  buttons: {
    width: "80%",
    height: 60,
    paddingTop: 20
  }
});

export default RoutineEvent;