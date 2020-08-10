import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import BackgroundCurve from '../components/BackgroundCurve';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useAsyncStorage} from '@react-native-community/async-storage';

const Search = props => {
  const navigation = useNavigation();
  const [Api_search, set_Api_search] = useState(undefined);
  let [data_search, set_search] = useState('Hà Nội');
  
  useEffect(() => {
  
    get_Api_search();
  }, [get_Api_search, props.route.params]);

  const get_Api_search = () => {
   
    const search= props.route.params.search;
    
    return fetch(
      'https://quangdev12.000webhostapp.com/api/seach_hotel_api1/' +
      search,
      {
        method: 'get',
      },
    )
      .then(response => response.json())
      .then(resJson => {
        console.log('Api_search: ', resJson);
        if (resJson == 0) {
          set_Api_search('');
        } else {
          set_Api_search(resJson);
        }
      });
  };

  const onChangeTextInput = text => {
    return fetch(
      'https://quangdev12.000webhostapp.com/api/seach_hotel_api1/' + text,
      {
        method: 'get',
      },
    )
      .then(response => response.json())
      .then(resJson => {
        console.log('Api_search: ', resJson);
        if (resJson == 0) {
          set_Api_search('');
        } else {
          set_Api_search(resJson);
        }
      });
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <BackgroundCurve style={styles.svg} />
      <ScrollView style={styles.bodyContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => goBack()}>
            <Entypo name="chevron-left" color="#fff" size={30} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Search Result</Text>
        </View>
        <View style={styles.FromInput}>
          <View style={styles.inputSearchContainer}>
            <TextInput
              onChangeText={text => {
                onChangeTextInput(text);
              }}
              style={styles.inputSearch}
              placeholder={props.route.params.search}
            />
            <TouchableOpacity
              style={styles.buttonSearch}
              onPress={() => get_Api_search()}>
              <Feather name="search" color="gray" size={16} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          style={{backgroundColor: '#fff'}}
          data={Api_search}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Details', {
                    id: item.id,
                    image: item.img1,
                    address: item.address,
                    name: item.name,
                    price: item.price,
                  })
                }>
                <Image
                  source={{uri: '' + item.img1}}
                  style={{width: '100%', height: 150}}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 23,
                  fontWeight: 'bold',
                  marginLeft: 20,
                  marginTop: 5,
                }}>
                {item.name}
              </Text>
              <View style={styles.span}>
                <Icons name="location" size={20} color="black" />
                <Text style={{color: '#FF5733'}}>{item.address}</Text>
              </View>
              <Text
                style={{
                  color: 'red',
                  fontSize: 18,
                  marginLeft: 20,
                  paddingTop: 5,
                }}>
                ${item.price}
              </Text>
              <View style={styles.icon}>
                <View style={styles.block}>
                  <Icon name="ios-wifi" size={20} color="black" />
                  <Text>Free wifi</Text>
                </View>
                <View style={styles.block}>
                  <Icon name="md-wine" size={20} color="black" />
                  <Text>Free wifi</Text>
                </View>
                <View style={styles.block}>
                  <Icon name="md-car" size={20} color="black" />
                  <Text>Free wifi</Text>
                </View>
                <View style={styles.block}>
                  <Icon name="ios-paw" size={20} color="black" />
                  <Text>Free wifi</Text>
                </View>
                <View style={styles.block}>
                  <Icon name="ios-tv" size={20} color="black" />
                  <Text>Free wifi</Text>
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  svg: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    top: -245,
  },
  bodyContainer: {
    marginTop: 5,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginEnd: 30,
  },
  inputSearchContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
  },
  inputSearch: {
    padding: 12,
    fontSize: 16,
    fontWeight: '500',
    color: 'gray',
    flex: 1,
  },
  buttonSearch: {
    shadowColor: '#222',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 12,
    backgroundColor: '#fff',
    padding: 13,
    borderRadius: 30,
    aspectRatio: 1,
  },
  FromInput: {
    marginBottom: '16%',
    backgroundColor: '#fff',
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 25,
    shadowColor: '#222',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  span: {
    flexDirection: 'row',
    marginLeft: 14,
    paddingTop: 5,
  },
  icon: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-around',
  },
  block: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Search;
