import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TouchableHighlight, FlatList, View } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

export default class MyList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
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

      static navigationOptions = {
        drawerLabel: 'My List'
      };
    
      render() {
        return (
            <View style={styles.container}>
              <Text onPress={() => this.props.navigation.toggleDrawer()}>Menu</Text>
              <Text>My List</Text>
              <FlatList style={styles.list}
                data={this.state.data}
                renderItem={({ item }) => (
                  <TouchableHighlight>
                    <View style={styles.box}>
                        <Text>{item.text}</Text>
                    </View>
                  </TouchableHighlight>
                )}
                ItemSeparatorComponent={this.separator}
                keyExtractor={item => item.text}
              />
            </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#eaf0f9',
    },
      list: {
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
