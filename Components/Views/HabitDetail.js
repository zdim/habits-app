import React, { useState } from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";

const HabitDetail = ({screenProps, navigation}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#eaf0f9",
      justifyContent: "center"
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

  var [id, setId] = useState(navigation.getParam('id', null));
  var [name, setName] = useState(navigation.getParam('name', null));

  saveEvent = () => {
    const firebase = screenProps.firebase;
    const uid = firebase.auth().currentUser.uid;
    if(id) {
        firebase.database().ref('habits/' + uid + '/' + id).set({
            name: name.trim()
        }).then(() => {
            navigation.goBack(); 
        }).catch((e) => { console.log(e.message); });
    } else {
        firebase.database().ref('habits/' + uid).push({
            name: name.trim()
        }).then(() => {
            navigation.goBack(); 
        }).catch((e) => { console.log(e.message); });
    }
  }

  return (
    <View>
      <TextInput
        style={styles.textFields}
        onChangeText={text => setName(text)}
        placeholder="New Habit"
      >
        {name}
      </TextInput>
      <View style={styles.buttons}>
        <Button onPress={() => this.saveEvent()} title="Save" color="blue" />
        <Button
          onPress={() => navigation.goBack()}
          title="Cancel"
          color="grey"
        />
      </View>
    </View>
  );
};

export default HabitDetail;