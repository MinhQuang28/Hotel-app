import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import Home from './src/Home';
import Hotel from './src/Hotel/Hotel';
import Booking from './src/Booking/booking';
import bookingRoom from './src/Hotel/bookingRoom';
import User from './src/User/user';
import Entypo from 'react-native-vector-icons/Entypo';
import Search from './src/Search';
import Room from './src/Hotel/Room';
import Detail_hotel from './src/Hotel/detail_hotel';
import Profile from './src/User/profile';
import editProfile from './src/User/editProfile';
import Login from './src/User/login';
import {AsyncStorage} from 'react-native';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import {Provider} from 'react-redux';
import configureStore from './configureStore';

const screenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = 'home';
    } else if (route.name === 'Search') {
      iconName = 'magnifying-glass';
    } else if (route.name === 'Hotel') {
      iconName = 'text-document';
    } else if (route.name === 'Booking') {
      iconName = 'clipboard';
    } else if (route.name === 'User') {
      iconName = 'user';
    }
    return <Entypo name={iconName} size={size} color={color} />;
  },
});
console.disableYellowBox = true;

function Screen_hotel() {
  return (
    <Stack.Navigator >
      <Stack.Screen
        options={{headerShown: false}}
        name="Details_hotel"
        component={Hotel}
      />
      <Stack.Screen options={{ title: 'Hotel Information', headerTitleAlign:"center" }} name="Details"  component={Detail_hotel} />
      <Stack.Screen  options={{ title: 'Room Information',headerTitleAlign:"center"  }} name="roomDetail" component={Room} />
      <Stack.Screen options={{ title: 'Booking',headerTitleAlign:"center"  }} name="bookingRoom" component={bookingRoom} />
    </Stack.Navigator>
  );
}

function Screen_booking() {
  return (
    <Stack.Navigator screenOptions={{headerTitle: false}}>
      <Stack.Screen
        name="Booking"
        options={{headerShown: false}}
        initialParams={{id: 1}}
        component={Booking}
      />
    </Stack.Navigator>
  );
}

function Screen_search_hotel(navigation, route) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        options={{headerShown: false}}
        initialParams={{search: 'Hà Nội'}}
        component={Search}
      />
      <Stack.Screen options={{ title: 'Hotel Information',headerTitleAlign:"center"   }}  name="Details" component={Detail_hotel} />
      <Stack.Screen  options={{ title: 'Room Information' ,headerTitleAlign:"center"  }}  name="roomDetail" component={Room} />
      <Stack.Screen options={{ title: 'Booking' ,headerTitleAlign:"center"  }}  name="bookingRoom" headerTitle="booking detail" component={bookingRoom} />
    </Stack.Navigator>
  );
}

function Screen_login(navigation, route) {
  const [ckeck, setCheck] = useState('');
  AsyncStorage.getItem('login', (err, result) => {
    if (!err && result != null) {
      setCheck(1);
    } else {
      setCheck(0);
    }
  });
  if (ckeck == 0) {
    return (
      <Stack.Navigator screenOptions={{headerTitle: false}}>
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={Login}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator screenOptions={{headerTitle: false}}>
        <Stack.Screen
          name="Profile"
          options={{headerShown: false}}
          component={Profile}
        />
      <Stack.Screen name="editProfile" component={editProfile} />
      </Stack.Navigator>
    );
  }
}

function Screen_List_cty_detail(navigation, route) {
  return (
    <Stack.Navigator screenOptions={{headerTitle: false}}>
      <Stack.Screen
        name="Home"
        options={{headerShown: false}}
        component={Home}
      />
      <Stack.Screen name="Details" component={Detail_hotel} />
      <Stack.Screen name="roomDetail" component={Room} />
      <Stack.Screen name="bookingRoom" component={bookingRoom} />
    </Stack.Navigator>
  );
}

export default function Home_tab() {
  return (
    <Provider store={configureStore()}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={screenOptions}
          tabBarOptions={{
            activeTintColor: '#FB7200',
            inactiveTintColor: '#464962',
          }}>
          <Tab.Screen name="Home" component={Screen_List_cty_detail} />
          <Tab.Screen name="Search" component={Screen_search_hotel} />
          <Tab.Screen name="Hotel" component={Screen_hotel} />
          <Tab.Screen name="Booking" component={Screen_booking} />
          <Tab.Screen name="User" component={Screen_login} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
