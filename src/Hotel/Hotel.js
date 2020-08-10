import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
const { width, height } = Dimensions.get('window');

function HotelList({ navigation }) {

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const get_Api = () => {
    console.log(page);
    return fetch(
      'https://quangdev12.000webhostapp.com/api/get_list_hotel/' +
      page,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(resJson => {
        console.log('log 17: ', resJson);
        let b = [...users, ...resJson];
        setUsers(b);
        setLoading(false);

      });
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setPage(1);
      get_Api();
      // alert('Screen was focused');
      // Do something when the screen is focused
      return () => {
        // alert('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );


  useEffect(() => {

    get_Api();
  }, []);

  const handleLoadMore = () => {
    // setLoading(true);
    setPage(page + 1);
    get_Api();

  };

  renderHeader = () => {
    return (
      <>
        <View>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/85/99/8599_v14.jpeg',
            }}
          />
        </View>
        <Text style={styles.textRegister}>
        </Text>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>List Hotels</Text>
        <Text style={styles.text_Header}>A Legendary welcome, every time</Text>
      </View>
      <View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
            <FlatList
              style={{ width: '100%', marginBottom: '50%' }}
              data={users}
              ListHeaderComponent={renderHeader()}
              numColumns={2}
              onEndReached={handleLoadMore}
              onEndThreshold={0}
              keyExtractor={(item, index) => item.hotel_id}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <View style={styles.one}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Details', {
                          id: item.hotel_id,
                          image: item.img1,
                          address: item.hotel_address,
                          name: item.name_hotel,
                          price: item.price_avg,
                        })
                      }>
                      <Image
                        style={styles.imageMain}
                        source={{ uri: '' + item.img1 }}
                      />
                      <View>
                        <View style={styles.span}>
                          <Icon name="location" size={20} color="black" />
                          <Text
                            style={{
                              color: '#FF5733',
                              height: 30,
                              width: '90%',
                            }}>
                            {item.hotel_address}
                          </Text>
                        </View>
                        <Text style={styles.Textmain}>{item.name_hotel}</Text>
                        <Text style={styles.TextPrice}>${item.price_avg}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  text_Header: {
    fontSize: 20,
    color: 'gray',
  },
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom: 20,
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#222',
  },
  image: {
    width: 375,
    height: 150,
  },
  imageMain: {
    width: 160,
    height: 184,
    borderRadius: 10,
  },
  textRegister: {
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
    height: 300,
  },
  one: {
    flexDirection: 'column',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  span: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  Textmain: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left',
    height: 22,
  },
  TextPrice: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
    height: 22,
    color:'red'
  },
});
export default HotelList;
