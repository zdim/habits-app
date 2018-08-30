import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
      };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value='Email'/>
                <TextInput
                    value='Password'/>
                <Text onPress={() => { this.props.navigation.navigate('Navigator'); }}>Sign In</Text>
                <Text>Register</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaf0f9',
        alignItems: 'center',
        justifyContent: 'center'
  }
});