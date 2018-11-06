import React from 'react';
import { TextInput, Button, View, StyleSheet, Alert } from 'react-native';
import Expo from 'expo';
import firebase from 'firebase'



async function googleAuth() {
    //372361244472-e7j8gckg29l6ns0vhk1aem28verf05bm.apps.googleusercontent.com android
    //372361244472-o8r9sp9ftuu6ffb5amr5t58j56244k3t.apps.googleusercontent.com ios

    try {
        const result = await Expo.Google.logInAsync({
            androidClientId: '372361244472-e7j8gckg29l6ns0vhk1aem28verf05bm.apps.googleusercontent.com',
            iosClientId: '372361244472-o8r9sp9ftuu6ffb5amr5t58j56244k3t.apps.googleusercontent.com',
            scopes: [ 'profile', 'email' ]
        });
        return result;        
    } catch(e) {
        return { error: e };
    }
}

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

    googleLogIn = () => {
        googleAuth()
            .then((result) => {
                console.log(result);
                const credential = this.props.screenProps.firebase.auth.GoogleAuthProvider.credential(result.idToken);
                firebase.auth().signInAndRetrieveDataWithCredential(credential)
                    .then(() => { this.loginSuccessful(); })
                    .catch((error) => { Alert.alert(error.message); console.log(error); });
            })
            .catch((error) => { Alert.alert(error.message); console.log(error); });
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
                        onPress={() => this.googleLogIn()}
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