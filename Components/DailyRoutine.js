import React from 'react';
import { Text, Button, View, FlatList, TouchableHighlight, StyleSheet } from 'react-native';

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
      const uid = this.props.screenProps.firebase.auth().currentUser.uid;
      this.props.screenProps.firebase.database().ref('events/' + uid).on('value', 
        (snapshot) => {
          console.log(snapshot.val());
          if(snapshot.val())
            this.setState({ data: Object.entries(snapshot.val()) });
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
                onPress={() => {this.props.navigation.navigate('RoutineEvent', { 
                    id: null,
                    name: '',
                    startTime: '00:00',
                    endTime: '00:00' 
                  });}}
                title='Add New'
                color='blue'/>
              <FlatList style={styles.list}
                data={this.state.data}
                renderItem={({ item }) => (
                  <TouchableHighlight onPress={() => { this.props.navigation.navigate('RoutineEvent', {
                    id: item[0],
                    name: item[1].name,
                    startTime: item[1].startTime,
                    endTime: item[1].endTime
                  })}}>
                    <View style={styles.box}>
                        <Text>{item[1].name}</Text>
                        <Text>{item[1].startTime + ' - ' + item[1].endTime}</Text>
                    </View>
                  </TouchableHighlight>
                )}
                ItemSeparatorComponent={this.separator}
                keyExtractor={item => item[1].name}
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