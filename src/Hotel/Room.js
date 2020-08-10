import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Button,
} from 'react-native';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
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
  footer: {
    flexDirection: 'row',
  },
  modal: {
    height: 50,
    backgroundColor: 'blue',
    borderWidth: 1,
    position: 'absolute',
    bottom: -100,
  },
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  bottomView: {
    flexDirection: 'row',
    borderTopColor: 'red',
    width: '100%',
    height: 80,
    backgroundColor: '#FFf',
    alignContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  butom: {
    padding: 20,
    marginLeft: '30%',
    width: '40%',
  },
});
class Room_detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      name_hotel: this.props.route.params.name_hotel,
      roomDetail: [],
    };
  }
  get_Api_room = () => {
    return fetch('https://quangdev12.000webhostapp.com/api/info_room_id', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_room: this.state.id,
      }),
    })
      .then(response => response.json())
      .then(resJson => {
        console.log('log_rom: ', resJson);
        this.setState({loading: false, roomDetail: resJson});
      });
  };
  componentDidMount() {
    this.get_Api_room();
  }
  render() {
    const roomDetail = this.state.roomDetail;
    return (
      <View style={styles.container}>
        <ScrollView style={{marginBottom: '20%'}}>
          <View style={styles.header}>
            <Image
              style={{height: 150, width: '49%'}}
              source={{uri: '' + roomDetail.img}}
            />
            <Image
              style={{height: 150, width: '49%'}}
              source={{uri: '' + roomDetail.img1}}
            />
          </View>
          <View style={styles.header}>
            <Image
              style={{height: 120, width: '32%'}}
              source={{uri: '' + roomDetail.img2}}
            />
            <Image
              style={{height: 120, width: '32%'}}
              source={{uri: '' + roomDetail.img3}}
            />
            <Image
              style={{height: 120, width: '32%'}}
              source={{uri: '' + roomDetail.img4}}
            />
          </View>
          <View style={styles.main}>
            <Text style={{fontSize: 28, fontWeight: 'bold', margin: 10}}>
              {roomDetail.name}{' '}
            </Text>
            <Text style={{ height: 20, marginTop: 3, marginBottom: 10,marginLeft:20 }}>
          <Image source={require('../asset/star.png')} />
          <Image source={require('../asset/star.png')} />
          <Image source={require('../asset/star.png')} />
          <Image source={require('../asset/star.png')} />
          <Image source={require('../asset/star.png')} />
        </Text>
            <View style={styles.icon}>
              <View style={styles.block}>
                <Icon name="ios-wifi" size={20} color="#377a75" />
                <Text>Free wifi</Text>
              </View>
              <View style={styles.block}>
                <Icon name="md-wine" size={20} color="#377a75" />
                <Text>Drink</Text>
              </View>
              <View style={styles.block}>
                <Icon name="md-car" size={20} color="#377a75" />
                <Text>Car</Text>
              </View>
              <View style={styles.block}>
                <Icon name="ios-paw" size={20} color="#377a75" />
                <Text>View</Text>
              </View>
              <View style={styles.block}>
                <Icon name="ios-tv" size={20} color="#377a75" />
                <Text>TV</Text>
              </View>
            </View>
            <View style={styles.icon}>
              <View style={styles.block}>
                <Icon name="md-bed" size={20} color="#377a75" />
                <Text>Free wifi</Text>
              </View>
              <View style={styles.block}>
                <Icon name="ios-football" size={20} color="#377a75" />
                <Text>Drink</Text>
              </View>
              <View style={styles.block}>
                <Icon name="ios-person" size={20} color="#377a75" />
                <Text>Car</Text>
              </View>
              <View style={styles.block}>
                <Icon name="ios-time" size={20} color="#377a75" />
                <Text>View</Text>
              </View>
              <View style={styles.block}>
                <Icon name="ios-airplane" size={20} color="#377a75" />
                <Text>TV</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', margin: 10}}>
              Room Descrition
            </Text>
            <Text style={{paddingLeft: 10}}>{roomDetail.desc}</Text>
          </View>
          <View style={styles.footer}>
            <Image
              style={{height: 140, width: '32%', margin: 10, borderRadius: 10}}
              source={{uri: '' + roomDetail.img5}}
            />
            <View style={{width: '50%', margin: 8}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', margin: 10}}>
                {roomDetail.name}
              </Text>
              <Text>{roomDetail.service}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.MainContainer}>
          <View style={styles.bottomView}>
            <View style={{paddingLeft: 20}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Price</Text>
              <Text style={{color: 'red', fontSize: 20}}>
                ${roomDetail.price}
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>AVG/Night</Text>
            </View>
            <View style={styles.butom}>
              <Button
                color="#FF9900"
                title="Book Now"
                onPress={() =>
                  this.props.navigation.navigate('bookingRoom', {
                    id: roomDetail.id_room,
                    name: roomDetail.name,
                    price: roomDetail.price,
                    desc: roomDetail.desc,
                    name_hotel: this.state.name_hotel,
                    img:roomDetail.img
                  })
                }
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default Room_detail;
