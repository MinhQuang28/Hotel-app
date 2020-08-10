import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from './profile';
import Swiper from 'react-native-swiper';
const W = Dimensions.get('window').width;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      ckeckLogin: {},
    };
  }
  Check_login = () => {
    return fetch('https://quangdev12.000webhostapp.com/api/login_user_api', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        pass: this.state.password,
      }),
    })
      .then(response => response.json())
      .then(resJson => {
        console.log('uesr: ', resJson);
        this.setState({ckeckLogin: resJson});
        console.log('check', this.state.ckeckLogin);
        if (this.state.ckeckLogin.id) {
          AsyncStorage.setItem(
            'login',
            '' + JSON.stringify(this.state.ckeckLogin),
          );
          this.props.navigation.navigate('Profile');
        } else {
          Alert.alert('Thông báo!', 'Bạn đã đăng nhập không thành công!');
        }
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={
            (styles,
            {color: 'black', fontSize: 20, fontWeight: 'bold', padding: '5%'})
          }>
          Sign In
        </Text>
        <Swiper style={styles.wrapper}>
          <View style={styles.slide}>
            <Image
              style={styles.imageSlide}
              source={{
                uri:
                  'https://pix10.agoda.net/hotelImages/622/6228963/6228963_18120109590070049384.jpg?s=1024x768',
              }}
            />
            <Text style={styles.TextTitle}>Phòng rộng rãi</Text>
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.imageSlide}
              source={{
                uri:
                  'https://cdn1.ivivu.com/iVivu/2019/01/31/16/khach-san-tam-dung-1-da-lat-3-800x450.png',
              }}
            />
            <Text style={styles.TextTitle}>Phục vụ nhiệt tình</Text>
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.imageSlide}
              source={{
                uri:
                  'https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10018210-e68b292c080bfe40b107e1e33af7dfab.jpeg?tr=q-40,c-at_max,w-740,h-500&_src=imagekit',
              }}
            />
            <Text style={styles.TextTitle}>Trải nghiệm không giới hạn</Text>
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.imageSlide}
              source={{
                uri:
                  'https://r-cf.bstatic.com/images/hotel/max1024x768/979/97987930.jpg',
              }}
            />
            <Text style={styles.TextTitle}>Dịch vụ 24/24</Text>
          </View>
        </Swiper>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
          }}>
          <View style={styles.fromInput}>
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({email: text})}
              placeholder="Email"
            />
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({password: text})}
              secureTextEntry={true}
              placeholder="password"
            />
          </View>
          <View style={{width: '80%', margin: '10%'}}>
            <Button
              onPress={() => this.Check_login()}
              color="#ff5733"
              title="    Sign In   "
            />
            
          </View>
          <Text style={{color: '#ff5733', fontSize: 18}}>
            Forgot your password?
          </Text>
        </View>
      </View>
    );
  }
}

const SettingsStack = createStackNavigator();

export default function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Login}
      />
      <SettingsStack.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}
      />
    </SettingsStack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
   
    flex: 1,
  },
  input: {
    margin: 5,
    width: 350,
    height: 40,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#48BBEC',
    backgroundColor: '#eaecee',
    paddingLeft: 15,
  },
  btnBtn: {
    width: '60%',
    height: 150,
    backgroundColor: 'red',
  },
  fromInput: {
    marginTop: '-5%',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  Swiper: {
    height: W / 2 + 100,
    borderRadius: 1,
    marginTop: 50,
    alignSelf: 'center',
  },
  slide: {
    alignSelf: 'center',
  },
  imageSlide: {
    width: (W - 50) / 2 + 40,
    height: (W - 50) / 2 + 40,
    borderRadius: 1000,
    marginBottom: 10,
  },
  TextTitle: {
    marginTop: 12,
    alignSelf: 'center',
    fontSize: 20,
  },
});
