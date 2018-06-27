import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, StatusBar } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Home'
      };
      
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.toggleDrawer();
                }}>
                <Icon name="md-menu" size={30} />
            </TouchableOpacity>
        </View>
        <Text style={styles.title}>
          Habits
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'flex-start'
    },
    container: {
        flex: 1,
        backgroundColor: '#eaf0f9',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    },
    title: {
        fontSize: 24,
        paddingTop: 12,
        paddingBottom: 12
    }
});