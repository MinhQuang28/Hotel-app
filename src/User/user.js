import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Login from './login';
import Profile from './profile';

const W = Dimensions.get('window').width;

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ckeck: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('login', (err, result) => {
      if (!err && result != null) {
        this.setState({ckeck: 1});
      } else {
        this.setState({ckeck: 0});
      }
    });
  }
  render() {
    if (this.state.ckeck == 1) {
      return <Profile />;
    } else {
      return <Login />;
    }
  }
}
export default User;
