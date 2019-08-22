import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  FlatList,
  View
} from "react-native";
import FloatingNewButton from "../FloatingNewButton";

const HabitList = ({ screenProps, navigation }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#eaf0f9",
      paddingTop: 20
    },
    list: {
      paddingLeft: 6,
      paddingRight: 6
    },
    box: {
      backgroundColor: "#fff",
      height: 150,
      width: 360,
      alignItems: "center",
      justifyContent: "center"
    },
    textBackground: {
      backgroundColor: "rgba(25, 25, 25, .8)"
    },
    boxTitle: {
      fontSize: 18,
      color: "white",
      paddingLeft: 8,
      paddingRight: 8
    }
  });

  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const firebase = screenProps.firebase;
    const uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("habits/" + uid)
      .on("value", snapshot => {
        if (snapshot.val()) setHabits(Object.entries(snapshot.val()));
      });
  }, []);

  const separator = () => {
    return (
      <View
        style={{
          height: 6,
          width: "100%",
          backgroundColor: "#eaf0f9"
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <FlatList
          style={styles.list}
          data={habits}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => {
                navigation.navigate("HabitDetail", {
                  id: item[0],
                  name: item[1].name
                });
              }}
            >
              <View style={styles.box}>
                <View style={styles.textBackground}>
                  <Text style={styles.boxTitle}>{item[1].name}</Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
          ItemSeparatorComponent={separator}
          keyExtractor={item => item[1].name}
        />
      </View>
      <FloatingNewButton onPress={() => navigation.navigate("HabitDetail")} />
    </View>
  );
};

HabitList.navigationOptions = {
  drawerLabel: "Habits",
  title: "My Habits"
};

export default HabitList;
