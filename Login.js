import React from 'react';
import { TextInput, Button, View, StyleSheet, Alert } from 'react-native';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    static navigationOptions = {
        header: null
      };

    loginSuccessful = () => {
        this.props.navigation.navigate('Navigator');
    }

    register = (email, password) => {
        this.props.screenProps.firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => { this.loginSuccessful(); })
            .catch((error) => { Alert.alert(error.message); });        
    }

    logIn = (email, password) => {
        this.props.screenProps.firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => { this.loginSuccessful(); })
            .catch((error) => { Alert.alert(error.message); });
    }

    googleAuth = () => {
        
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.textFields}
                    placeholder='Email'
                    autoCapitalize={'none'}
                    onChangeText={(text) => {this.setState({email: text})}}/>
                <TextInput style={styles.textFields}
                    placeholder='Password'
                    secureTextEntry={true}
                    autoCapitalize={'none'}
                    onChangeText={(text) => {this.setState({password: text})}}/>
                <View style={styles.buttons}>
                    <Button
                        onPress={() => this.logIn(this.state.email, this.state.password)}
                        title='Sign In'
                        color='blue'/>
                    <Button
                        onPress={() => this.register(this.state.email, this.state.password)}
                        title='Register'
                        color='blue'/>
                    <Button
                        onPress={() => this.googleAuth()}
                        title='Sign in with Google'
                        color='#db3236'/>
                </View>
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
    },
    textFields: {
        width: '80%',
        height: 40,
        fontSize: 16,
        paddingBottom: 20
    },
    buttons: {
        width: '80%',
        height: 60,
        paddingTop: 20
    }
});