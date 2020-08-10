import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
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


function editProfile({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    return (
        <View>
        <TextInput
           
           
              secureTextEntry={true}
              placeholder="password"
            />
      </View>
      );
     
  
}
export default editProfile;
