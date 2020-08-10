import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const W = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor:'#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom: 20,
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  itemImage: {
    width: (W - 60) / 2,
    height: (W - 40) / 2 + 30,
    backgroundColor: 'gray',
  },
  itemContainer: {
    backgroundColor:'white',
    marginRight: 20,
  },
  itemPrice: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
  },
  itemPriceOriginal: {
    color: 'gray',
    fontWeight: '500',
    fontSize: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemInner: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
    padding: 12,
    alignItems: 'flex-end',
  },
  imageBg: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  itemTime: {
    color: '#eee',
    fontWeight: '600',
    fontSize: 14,
  },
  itemSaleOff: {
    fontWeight: 'bold',
    backgroundColor: '#fff',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    paddingHorizontal: 10,
  },
});
class CardIndex extends Component{
   constructor(props){
      super(props);
      this.state = {
         cartIndex:[],
         loading: true,
      }
   }
   getApi_cartIndex = () =>{
    return fetch('https://quangdev12.000webhostapp.com/api/get_view_index', {
      method: 'get',
  })
      .then(response => response.json())
      .then((resJson) => {
          this.setState({ loading: false, cartIndex: resJson });
      });
   }
   componentDidMount(){
     this.getApi_cartIndex();
   }
   render(){
     const cartIndex = this.state.cartIndex;
     var count = Object.keys(cartIndex).length;
     return(
      <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>Top Hotel Booking</Text>
        <Text style={[styles.textHeader, {color: '#FB7200'}]}>
          VIEW ALL ({count})
        </Text>
      </View>
      {this.state.loading ? (  <ActivityIndicator size="large" />
                ) : (
      <ScrollView horizontal>
        {cartIndex.map(item => {
          return <Item key={item.hotel_id} item={item} />;
        })}
      </ScrollView>
                          )}
    </View>
     )
   }
}
const Item = ({item}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageBg}>
        <TouchableOpacity 
        onPress = {()=>navigation.navigate('Details',{
                   id:item.hotel_id,
                   image:item.img1,
                   address:item.hotel_address,
                   name:item.name_hotel,
                   price:item.price_avg,
        })}
        >
        <Image source={{uri: item.img1}} style={styles.itemImage} />
        <View style={styles.itemInner}>
          <View>
            <Text style={styles.itemName}>{item.name_hotel}</Text>
            <Text style={styles.itemTime}>{item.hotel_address}</Text>
          </View>
          <View style={{borderRadius: 30, overflow: 'hidden'}}>
          </View>
        </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemPrice}>
        ${item.price_avg}
      </Text>
    </View>
  );
};
export default CardIndex;
