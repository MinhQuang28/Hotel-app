import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icons from 'react-native-vector-icons/Feather';
import Icone from 'react-native-vector-icons/FontAwesome';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

class Detail_hotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      name: this.props.route.params.name,
      image: this.props.route.params.image,
      price: this.props.route.params.price,
      address: this.props.route.params.address,
      hotelList: [],
      List_romm_detail: [],
      profile: [],
      uesr: [],
      loading: true,
    };
  }
  get_Api_room_detail = () => {
    return fetch('https://quangdev12.000webhostapp.com/api/info_hotel_room', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_hotel: this.state.id,
      }),
    })
      .then(response => response.json())
      .then(resJson => {
        console.log('log_rom: ', resJson);
        this.setState({loading: false, List_romm_detail: resJson});
      });
  };
  get_Api_Byid = () => {
    return fetch('https://quangdev12.000webhostapp.com/api/info_hotel_id', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_hotel: this.state.id,
      }),
    })
      .then(response => response.json())
      .then(resJson => {
        console.log('log_by_id: ', resJson);
        this.setState({hotelList: resJson});
      });
  };
  componentDidMount() {
    this.get_Api_Byid();
    this.get_Api_room_detail();
  }
  render() {
    const uesr = this.state;
    const hotel_list = this.state.hotelList;
    return (
      <ScrollView>
        <View style={a.container}>
          <Image
            source={{uri: '' + hotel_list.img1}}
            style={{width: '100%', height: 300}}
          />
          <View style={a.banner}>
         
            <Text style={{fontSize: 23, fontWeight: 'bold'}}>
              {hotel_list.hotel_name}
            </Text>
            <Text style={{ height: 20, marginTop: 3, marginBottom: 3 }}>
          <Image source={require('../asset/star.png')} />
          <Image source={require('../asset/star.png')} />
          <Image source={require('../asset/star.png')} />
          <Image source={require('../asset/star.png')} />
          <Image source={require('../asset/star.png')} />
        </Text>
            <View style={a.span}>
              <Icon name="location" size={20} color="black" />
              <Text style={{color: '#FF5733'}}>{uesr.address}</Text>
            </View>
            <Text style={{ fontSize: 17 }}>Đến với chúng tôi quý khách</Text>
            <Text style={{ fontSize: 17 }}> Tận hưởng kì nghỉ thoải mái !</Text>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', marginTop: -30, paddingLeft: 10, }}>
        <View style={a.danhGia}>
          <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500', fontSize: 27 }}> 9.5
          </Text>
        </View>
        <View style={{ flexDirection: 'column', marginTop: 3, }}>
          <Text style={{ color: '#FF6347', fontSize: 25 }}>Excellent </Text>
          <Text style={{ fontSize: 17, }}> See 801 reviews </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', width: '100%',marginLeft:25 ,marginTop: 20, paddingBottom: 10, borderBottomWidth: 0.5 }}>
        <View style={{ flexDirection: 'column' ,width:'50%'}}>
          <Text style={{ marginBottom: 2 }}>Service</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '50%', borderRadius: 10, backgroundColor: '#4393ab', paddingRight: 160, height: 15, marginTop: 4 }}></View>
        
          </View>
          <Text style={{ marginBottom: 2, marginTop: 15 }}>Wifi</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '50%', borderRadius: 10, backgroundColor: '#4393ab', paddingRight: 160, height: 15, marginTop: 4 }}></View>
           
          </View>
        </View>

        <View style={{ flexDirection: 'column',width:'50%' }}>
          <Text style={{ marginBottom: 2 }}>Shower</Text>
          <View style={{ flexDirection: 'row'}}>
            <View style={{ width: '50%', borderRadius: 10, backgroundColor: '#4393ab', paddingRight: 160, height: 15, marginTop: 3 }}></View>
           
          </View>
          <Text style={{ marginBottom: 2, marginTop: 15 }}>Bed</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ borderRadius: 10, backgroundColor: '#4393ab', paddingRight: 160, height: 15, marginTop: 4 }}></View>
           
          </View>
        </View>
      </View>
          <View style={a.mainText}>
          <View style={{ width: '100%', paddingBottom: 10, borderBottomWidth: 0.2 }}>
        <Text style={{ fontWeight: '700', fontSize: 22, marginTop: 10 }}>Hotel Description</Text>
        <Text style={{ fontSize: 17, }}>{hotel_list.restaurant}</Text>
      </View>
            <Text style={{fontSize: 23, fontWeight: 'bold', paddingTop: 10}}>
              Room type
            </Text>
            {this.state.loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <FlatList
                data={this.state.List_romm_detail}
                keyExtractor={item => item.id_room}
                renderItem={({item}) => (
                  <View style={a.List_room}>
                    <TouchableOpacity
                      style={{
                        width: '50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        this.props.navigation.navigate('roomDetail', {
                          id: item.id_room,
                          name_hotel: hotel_list.hotel_name,
                        })
                      }>
                      <Image
                        source={{uri: '' + item.img}}
                        style={{
                          width: '100%',
                          height: 150,
                          borderRadius: 15,
                          resizeMode: 'contain',
                        }}
                      />
                   </TouchableOpacity>
                    <View style={a.List_room_right}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                        {item.name}
                      </Text>
                      <View style={{flexDirection:'row'}}>
                      <Text style={a.bigblue}>
                        {' '}
                        <Icons name="wifi" size={12} color="black" />  Wifi
                      </Text>
                      <Text style={a.bigblue}>
                        {' '}
                        <Icone name="subway" size={12} color="black" /> subway
                      </Text>
                      </View>
                     
                      <Text style={a.bigblue}>
                        {' '}
                        <Icone name="group" size={12} color="black" /> Group
                      </Text>
                      <Text style={a.bigblue}>
                        {' '}
                        <Icone name="shower" size={15} color="black" /> Shower
                      </Text>
                      <Text style={{color: 'red', fontSize: 22,fontWeight: 'bold',marginLeft:20}}>
                        ${item.price}
                      </Text>
                      <Text style={{ fontSize: 14, }}>{item.desc}</Text>
                    </View>
                   
                  </View>
                  
                )}
              />
            )}
            <View>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Need Us Help ?
              </Text>
              <Text>We would be happy to help you</Text>
              <Text style={a.phone}>
                {' '}
                <Icone name="phone" size={15} color="black" /> 09878787887
              </Text>
              <Text style={a.phone}>
                {' '}
                <Icons name="mail" size={15} color="black" /> abc123@gmail.com
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const a = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    zIndex: 1,
  },
  banner: {
    flexDirection: 'column',
    width: '90%',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    alignItems: 'center',
    height: 145,
    zIndex: 2,
    position: 'relative',
    top: -60,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.29,
shadowRadius: 4.65,

elevation: 7,
  },
  span: {
    flexDirection: 'row',
    padding: 6,
  },
  mainText: {
   
    width: '90%',
    justifyContent: 'center',
  },
  List_room: {
    padding: 10,
    width: '90%',
    flexDirection: 'row',
  },
  List_room_right: {
    padding: 5,
  },
  bigblue: {
    color: '#008080',
    fontSize: 14,
    borderColor: 'black',
    borderWidth: 1,
    width: 90,
    borderRadius: 10,
    margin: 3,
    paddingLeft: 10,
  },
  phone: {
    color: '#008080',
   
    fontSize: 13,
    marginLeft: -3,
  },
  danhGia: {
    height: 70,
    width: 70,
    borderRadius: 70,
    marginRight: 10,
    borderWidth: 0,
    justifyContent: 'center',
    backgroundColor: '#FF6347',
  },
});
export default Detail_hotel;
