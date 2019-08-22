import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

const FloatingNewButton = ({ onPress }) => {
  const styles = StyleSheet.create({
    floatingView: {
      position: "absolute",
      bottom: 60,
      right: 30,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    floatingButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "#ee6e73",
      justifyContent: "center",
      alignItems: "center"
    }
  });

  return (
    <View style={styles.floatingView}>
      <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
        <Image source={require("../resources/icons/add.png")} />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingNewButton;
