// import React, {Component} from 'react';
import React, {useState, useEffect} from 'react';
import {Container, Header, Content, Tab, Tabs} from 'native-base';
import Tab1 from './tabOne';
import Tab2 from './tabTwo';
import Tab3 from './tabThree';
import Tab4 from './tabFour';
import {Alert, Text} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
// class TabsExample extends Component {

function TabsExample() {
  const navigation = useNavigation();
  const [check, setCheck] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('login', (err, result) => {
        if (!err && result != null) {
          setCheck(1);
        } else {
          setCheck(0);
          Login();
        }
      });
      return () => {};
    }, [Login]),
  );

  useEffect(() => {
    AsyncStorage.getItem('login', (err, result) => {
      if (!err && result != null) {
        setCheck(1);
      } else {
        setCheck(0);
        Login();
      }
    });
  }, [Login]);
  function Login() {
    Alert.alert('Thông báo', 'Bạn cần đăng nhập để xem booking');
    navigation.navigate('User');
  }
  return (
    <Container>
      <Tabs>
        <Tab
          textStyle={{color: '#fff'}}
          tabStyle={{backgroundColor: '#FF9900'}}
          activeTabStyle={{backgroundColor: '#FF9900'}}
          heading="All">
          <Tab1 navigation={navigation} />
        </Tab>
        <Tab
          textStyle={{color: '#fff'}}
          tabStyle={{backgroundColor: '#FF9900'}}
          activeTabStyle={{backgroundColor: '#FF9900'}}
          heading="Waiting">
          <Tab2 navigation={navigation} />
        </Tab>
        <Tab
          textStyle={{color: '#fff'}}
          tabStyle={{backgroundColor: '#FF9900'}}
          activeTabStyle={{backgroundColor: '#FF9900'}}
          
          heading="Recrived">
          <Tab3 navigation={navigation} />
        </Tab>
        <Tab
          textStyle={{color: '#fff'}}
          tabStyle={{backgroundColor: '#FF9900'}}
          activeTabStyle={{backgroundColor: '#FF9900'}}
          heading="Canceled">
          <Tab4 navigation={navigation} />
        </Tab>
      </Tabs>
    </Container>
  );
}


export default TabsExample;
