import React from 'react';
import { Alert, Text, Button, View, FlatList, TouchableHighlight, StyleSheet } from 'react-native';

export default class DailyRoutine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    };

    static navigationOptions = {
      drawerLabel: 'Routine'
    };

    componentDidMount = () => {
      this.props.screenProps.firebase.database().ref('users/').on('value', 
        (snapshot) => {
          console.log(snapshot.val());
          this.setState({ data: Object.values(snapshot.val()) });
        });
    };

    separator = () => {
      return (
        <View
          style={{
            height: 6,
            width: '100%',
            backgroundColor: '#eaf0f9'
          }}
          />
      );
    };

    render() {
        return (
            <View style={styles.container}>
              <Text style={styles.title}>This is the daily routine</Text>
              <Button 
                onPress={() => this.props.navigation.navigate('RoutineEvent')}
                title='Add New'
                color='blue'/>
              <FlatList style={styles.list}
                data={this.state.data}
                renderItem={({ item }) => (
                  <TouchableHighlight>
                    <View style={styles.box}>
                        <Text>{item.name}</Text>
                    </View>
                  </TouchableHighlight>
                )}
                ItemSeparatorComponent={this.separator}
                keyExtractor={item => item.name}
              />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eaf0f9',
      alignItems: 'center'
    },
    title: {
        fontSize: 28,
        paddingBottom: 20
    },
    list: {
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 16
    },
    box: {
      backgroundColor: '#fff',
      height: 150,
      width: 360,
      alignItems: 'center',
      justifyContent: 'center'
    },
    textBackground: {
      backgroundColor: 'rgba(25, 25, 25, .8)'
    },
    boxTitle: {
      fontSize: 18,
      color: 'white',
      paddingLeft: 8,
      paddingRight: 8
    }
});