import React from 'react';
import { TextInput, Button, View, StyleSheet, Alert } from 'react-native';
import * as Expo from 'expo';
import firebase from 'firebase';
import { ANDROID_CLIENT, IOS_CLIENT } from 'react-native-dotenv';

async function googleAuth() {
    try {
        const result = await Expo.Google.logInAsync({
            androidClientId: `${ANDROID_CLIENT}.apps.googleusercontent.com`,
            iosClientId: `${IOS_CLIENT}.apps.googleusercontent.com`,
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

    componentDidMount = () => {
        // user is null if logged out - in which case, navigate back to this screen to login
        // TODO: Move the user data creation to the individual sign-in methods since each method has different variables
        firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            if(user) {
                const uid = user.uid;
                if(firebase.database().ref('users/' + uid).once('value', (snapshot) => {
                    if(!snapshot.hasChild(uid)) {
                        firebase.database().ref('users/' + uid).set({
                            email: user.email,
                            name: user.displayName
                        });
                    }
                }))
                this.props.navigation.navigate('Navigator');
            } else {
                this.props.navigation.navigate('Login');
            }            
        });
    }

    register = (email, password) => {
        this.props.screenProps.firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch((error) => { Alert.alert(error.message); });        
    }

    logIn = (email, password) => {
        this.props.screenProps.firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => { Alert.alert(error.message); });
    }

    googleLogIn = () => {
        googleAuth()
            .then((result) => {
                console.log(result);
                const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken || null);
                this.props.screenProps.firebase.auth().signInAndRetrieveDataWithCredential(credential)
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