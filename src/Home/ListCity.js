import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const W = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingHorizontal: 20,
    backgroundColor:'#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom: 10,
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

class Listcity extends Component{
  constructor(props){
    super(props);
    this.state = {
     cityIndex:[],
     loading:true,
    }
  }
  getApi_city_index = () => {
    return fetch('https://quangdev12.000webhostapp.com/api/get_city_index', {
        method: 'get',
    })
        .then(response => response.json())
        .then((resJson) => {
            console.log('cityIndex: ', resJson);
            this.setState({ loading: false, cityIndex: resJson });
        });
   }

   componentWillUnmount() {
    this.mounted = false
  }
   componentDidMount(){
     this.mounted = true;
     if (this.mounted) {
      this.getApi_city_index();
     }
   }
   render(){
    const cityIndex = this.state.cityIndex;
    return(
        <View style={styles.container}>
              <View style={styles.headerContainer}>
                <Text style={styles.textHeader}> Top Hot City</Text>
                <Text style={[styles.textHeader, {color: '#FB7200'}]} />
              </View>
              {this.state.loading ? (  <ActivityIndicator size="large" />
              ):(
                <ScrollView horizontal>
                {cityIndex.map(item => {
                  return <Item key={item.id} item={item} />;
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
         onPress = {()=> navigation.navigate('Search',{
          screen: 'search',
          params: { search: item.name },
        })}
        >
        <Image source={{uri: item.img}} style={styles.itemImage} />
        <View style={styles.itemInner}>
          <View>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
          <View style={{borderRadius: 30, overflow: 'hidden'}}>
            <Text style={styles.itemSaleOff}>
              <Ionicons name="md-locate" />
            </Text>
          </View>
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Listcity;
