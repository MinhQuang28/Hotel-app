import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Button,
  Switch,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Svg, {Ellipse} from 'react-native-svg';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './login';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      uesr: [],
    };
  }

  Profile_Api = () => {
    console.log(this.state.uesr.token);
    return fetch('https://quangdev12.000webhostapp.com/api/get_info_user_api', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.uesr.id,
        token: this.state.uesr.token,
      }),
    })
      .then(response => response.json())
      .then(resJson => {
        console.log('profile: ', resJson);
        this.setState({loading: false, profile: resJson});
      });
  };
  componentDidMount() {
    AsyncStorage.getItem('login', (err, result) => {
      this.setState({uesr: JSON.parse(result)});
      this.Profile_Api();
    });
  }

  Logout = () => {
    AsyncStorage.removeItem('login');
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.body}>
          <View style={styles.ellipseStack}>
            <Svg viewBox="0 0 859.43 890.3" style={styles.ellipse}>
              <Ellipse
                strokeWidth={1}
                fill="rgba(255,255,255,1)"
                cx={430}
                cy={445}
                rx={429}
                ry={445}
              />
            </Svg>
            <View style={styles.settingsList}>
              <View style={styles.accountSettings}>
                <View style={styles.subSettings}>
                  <View style={styles.editProfileColumn}>
                  <TouchableOpacity
                  onPress={()=>{ this.props.navigation.navigate('editProfile');}}>
                    <View style={styles.editProfile}>

                      <Text style={styles.text10}>Edit Profile</Text>
                      <View style={styles.text10Filler} />
                    
                        <IoniconsIcon
                          name="ios-arrow-forward"
                          style={styles.icon}
                        />
                    </View>
                    </TouchableOpacity>
                    <View style={styles.changeConnections}>
                      <Text style={styles.text11}>Change Password</Text>
                      <View style={styles.text11Filler} />
                      <TouchableOpacity>
                        <IoniconsIcon
                          name="ios-arrow-forward"
                          style={styles.icon2}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                
                
                  <View style={styles.providerSettings}>
                    <Text style={styles.text12}> MyCards</Text>
                    <View style={styles.text12Filler} />
                    <TouchableOpacity>
                      <IoniconsIcon
                        name="ios-arrow-forward"
                        style={styles.icon3}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.providerSettings}>
                    <Text style={styles.text12}> WishList</Text>
                    <View style={styles.text12Filler} />
                    <TouchableOpacity>
                      <IoniconsIcon
                        name="ios-arrow-forward"
                        style={styles.icon3}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.providerSettings}>
                    <Text style={styles.text12}> Settings</Text>
                    <View style={styles.text12Filler} />
                    <TouchableOpacity>
                      <IoniconsIcon
                        name="ios-arrow-forward"
                        style={styles.icon3}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.pageName}>Profile</Text>
            <View style={styles.userInfo}>
              <View style={styles.avatarRow}>
                <Image
                  source={{uri: '' + this.state.profile.avatar_user}}
                  resizeMode="stretch"
                  style={styles.avatar}
                />
                <View style={styles.userNameColumn}>
                  <Text style={styles.userName}>{this.state.profile.name}</Text>
                  <Text style={styles.userEmail}>
                    {this.state.profile.address}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{width: '80%', margin: '10%'}}>
          <Button
            color="#FF9900"
            title="Sign Out"
            onPress={() => this.Logout()}
          />
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
        component={Profile}
      />
      <SettingsStack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />
    </SettingsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },
  headerX: {
    height: 80,
    elevation: 15,
    shadowOffset: {
      height: 7,
      width: 1,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  body: {
    backgroundColor: '#FF9900',
    width: '100%',
    flex: 1,
  },
  ellipse: {
    top: 9,
    left: 0,
    width: 859,
    height: 890,
    position: 'absolute',
  },
  settingsList: {
    left: 51,
    height: 409,
    position: 'absolute',
    right: 450,
    bottom: 272,
  },
  accountSettings: {
    height: 165,
    marginTop: 15,
    marginLeft: 24,
    marginRight: 24,
  },
  expanded: {
    color: '#121212',
    fontSize: 18,
    marginTop: -3,
  },
  subSettings: {
    height: 118,
    marginTop: 12,
  },
  editProfile: {
    height: 40,
    flexDirection: 'row',
   borderBottomWidth: 2,
    borderColor: '#d1d1d1',
  },
  text10: {
    color: 'rgba(0,0,0,1)',
    fontSize: 16,
    marginTop: 6,
  },
  text10Filler: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    color: 'rgba(31,178,204,1)',
    fontSize: 30,
  },
  changeConnections: {
    height: 40,
    flexDirection: 'row',
    marginTop: 11,
    borderBottomWidth: 2,
    borderColor: '#d1d1d1',
  },
  text11: {
    color: 'rgba(0,0,0,1)',
    fontSize: 16,
    marginTop: 6,
  },
  text11Filler: {
    flex: 1,
    flexDirection: 'row',
  },
  icon2: {
    color: 'rgba(31,178,204,1)',
    fontSize: 30,
  },
  editProfileColumn: {
    marginLeft: 10,
    marginRight: 10,
  },
  editProfileColumnFiller: {
    flex: 1,
  },
  providerSettings: {
    height: 50,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 2,
    borderColor: '#d1d1d1',
  },
  text12: {
    color: 'rgba(0,0,0,1)',
    fontSize: 16,
    marginTop: 6,
  },
  text12Filler: {
    flex: 1,
    flexDirection: 'row',
  },
  icon3: {
    color: '#1fb2cc',
    fontSize: 30,
  },
  sub2: {
    height: 186,
    marginTop: 18,
    marginLeft: 29,
    marginRight: 29,
  },

  pageName: {
    top: 0,
    left: 85,
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 24,
  },
  userInfo: {
    top: 64,
    left: 87,
    height: 125,
    position: 'absolute',
    right: 451,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  userName: {
    color: '#1fb2cc',
    fontSize: 25,
  },
  userEmail: {
    color: 'rgba(0,0,0,1)',
    fontSize: 15,
    
    marginTop: 5,
  },
  userNameColumn: {
    width: 152,
    marginLeft: 12,
    marginTop: 13,
  },
  avatarRow: {
    height: 106,
    flexDirection: 'row',
    marginRight: 7,
  },
  ellipseStack: {
    height: 899,
    marginTop: 34,
    marginLeft: -50,
    marginRight: -449,
  },
});
