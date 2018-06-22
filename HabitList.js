import React from 'react';
import { StyleSheet, Text, TouchableHighlight, FlatList, View } from 'react-native';

export default class HabitList extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [{
            text: 'one',
            color: '#000'
          },
          {
            text: 'two',
            color: '#000'
          },
          {
            text: 'three',
            color: '#000'
          },
          {
            text: 'four',
            color: '#000'
          },
          {
            text: 'five',
            color: '#000'
          }]
        };
      }
    
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
            <FlatList style={styles.list}
              data={this.state.data}
              renderItem={({ item }) => (
                <TouchableHighlight>
                  <View style={styles.box}>
                    <View style={styles.textBackground}>
                      <Text style={styles.boxTitle}>{item.text}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              )}
              ItemSeparatorComponent={this.separator}
              keyExtractor={item => item.text}
            />
        );
      }
    }
    
    const styles = StyleSheet.create({
      list: {
        flex: 1,
        backgroundColor: '#eaf0f9',
        paddingLeft: 6,
        paddingRight: 6
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
