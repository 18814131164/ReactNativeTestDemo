/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

class ReactNativeTestDemo extends Component {
  render() {

    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to lyon!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Image source={pic} style={styles.image}/>
        <Greeting name = 'lyon' age = '23'/>
      </View>
    );
  }
}

// 道具props
class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name} I am{this.props.age}!</Text>
    );
  }
}

// css样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 0,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image:{
    width: 193, 
    height: 110,
    backgroundColor: 'red',
    margin: 10,

  }
});

AppRegistry.registerComponent('ReactNativeTestDemo', () => ReactNativeTestDemo);
