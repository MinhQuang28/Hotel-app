import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  Button,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Login from '../User/login';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
const W = Dimensions.get('window').width;
class bookRoom extends Component {
    constructor(props){
        super(props);
        this.state ={
               id:this.props.route.params.id,
               name:this.props.route.params.name,
               price:this.props.route.params.price,
               desc:this.props.route.params.desc,
               name_hotel:this.props.route.params.name_hotel,
               img:this.props.route.params.img,
               uesr:[],
               start_date:'',
               end_date:'',
               check:'',
               quantily:1,
               selectedStartDate: null,
               selectedEndDate: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
    }
  Api_dat_hang =()=>{
    if(this.state.start_date){
       if(this.state.end_date){
              if(this.state.check==1){
                return fetch('https://quangdev12.000webhostapp.com/api/api_booking_hotel', {
                  method: 'post',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    check_in: this.state.start_date,
                    check_out: this.state.end_date,
                    user_id: this.state.uesr.id,
                    type_room: this.state.id,
                    num_room: this.state.quantily,
                  })
              })
              .then(response => response.json())
              .then((resJson) => {
                  console.log('log_rom: ', resJson);
                  if(resJson == "success"){
                    Alert.alert(
                        'Thông báo',
                        'Bạn đã đặt phòng thành công',
                        [{ text: 'Thành công', 
                        // onPress: () => this.props.dispatch({type: 'UPDATE_HOTEL_LIST',  payload: 1}
                        //  )
                        }],
                        { cancelable: false }
                    );
                    this.props.navigation.navigate('Booking',{id:1});
                   }else{
                     Alert.alert('Thông báo','Ứng dụng gặp một số lỗi xin vui lòng thử lại sau')
                   }
              });
              }else{
                Alert.alert('Thông báo','Bạn phải đăng nhập');
                this.props.navigation.navigate('User');
              }
       }else{
        Alert.alert('Thông báo', 'Bạn hãy nhập ngày kết thúc')
       }
    }else{
      Alert.alert('Thông báo', 'Bạn hãy nhập ngày bắt đầu')
    }
  }

    componentDidMount(){
      AsyncStorage.getItem('login', (err, result) => {
        if (!err && result != null){
          this.setState({uesr:JSON.parse(result)})
          this.setState({check : 1})
      }
      else {
        this.setState({check : 0})
      }
      });
    }
    onDateChange(date, type) {
      if (type === 'END_DATE') {
        console.log(new Date(date));
        let check_out=this.convetDate( new Date(date));
       
        this.setState({
          selectedEndDate: date,end_date:check_out
        });
        console.log();

      } else {
     
        let check_in=this.convetDate( new Date(date));
        this.setState({
          selectedStartDate: date,
          selectedEndDate: null,start_date:check_in
        });
      }
    }
     convetDate = (date) => {
      let time_get =
      date.getFullYear() +
        '-' +
        parseInt(date.getMonth() + 1) +
        '-' +
        date.getDate();
      
      return time_get;
     }
     convetDate1 = (date) => {
      let time_get =
      date.getDate() +
        '/' +
        parseInt(date.getMonth() + 1) +
        '/' +
         date.getFullYear();
     
      return time_get;
     }
     SetNum_room(num){
       this.setState({quantily:num});
       if(num==1){
        this.setState({num1 : true,num2:false,num3:false});
       }else if(num==2){
        this.setState({num1 : false,num2:true,num3:false});
       }else{
        this.setState({num1 : false,num2:false,num3:true});
       }

     }
   render(){
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2020, 12, 12);
    const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';
       return(
        <View style={styles.container}>
        <ScrollView style={{marginBottom:'20%'}}>
        <View style={styles.textHeader}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>Preview Booking</Text>
        <Text>
            Booking Number
        </Text>
        </View>
        <View style={{margin: 23,}}>
            <Text style={{fontSize:18}}>Hotel :</Text>
           <Text style={{fontWeight:'bold', fontSize:20,}}>{this.state.name_hotel}</Text>
        </View>
        <View style={styles.main}>
         <Text style={styles.ckeck}> chose Date :</Text>
              <View >
              <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
        />
 
        <View>
          <Text>SELECTED START DATE:{ startDate }</Text>
          <Text>SELECTED END DATE:{ endDate }</Text>
        </View>
           
              
              <View>
                <Text style={styles.ckeck}>Selected</Text>
                <View style={{flexDirection:"row"}}>
                <Text  style={styles.ckeck}>Check-In: </Text>
                <Text style={{ fontWeight:'bold', fontSize:16,color:"gray",marginTop:16}}>{this.state.start_date!=''?this.state.start_date:this.convetDate1(new Date())}</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <Text  style={styles.ckeck}>Check-Out: </Text>
                <Text style={{ fontWeight:'bold', fontSize:16,color:"gray",marginTop:16}}>{this.state.start_date!=''?this.state.end_date:this.convetDate1(new Date())}</Text>
              </View>
                </View>
                
              </View>

            
              <Text style={styles.ckeck}>Quantily</Text>
              <View style={{flexDirection:'row',justifyContent:"center"}}>
              <TouchableOpacity 
               style={ this.state.num1? styles.daGiaoButton: styles.giaobai_btn}
                                onPress={() => { this.SetNum_room(1); 
                                }}>
                            
                   <Text style={ this.state.num1? styles.statusText: styles.statusText1}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity 
               style={ this.state.num2? styles.daGiaoButton: styles.giaobai_btn}
                                onPress={() => { this.SetNum_room(2); 
                                }}>
                            
                   <Text style={ this.state.num2? styles.statusText: styles.statusText1}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity 
               style={ this.state.num3? styles.daGiaoButton: styles.giaobai_btn}
                                onPress={() => { this.SetNum_room(3); 
                                }}>
                            
                   <Text style={ this.state.num3? styles.statusText: styles.statusText1}>3</Text>
              </TouchableOpacity>
               
              </View>   
            
        </View>
        <View style={styles.desc}>
        <Text style={{fontSize:18}}>Room :</Text>
        <Image
              style={{height: 250, width: '100%'}}
              source={{uri: '' + this.state.img}}
            />
       <Text  style={{fontWeight:'bold', fontSize:20,}}>{this.state.name}</Text>
       <Text>{this.state.desc}</Text>
        </View>
        </ScrollView>
        <View style = { styles.MainContainer }>
                    <View style={ styles.bottomView} >
                        <View style={{paddingLeft:20}}>
                        <Text style={{fontWeight:'bold',fontSize:18,}}>Price</Text>
                          <Text style={{color:'red',fontSize:20}}>${this.state.price}</Text>
                        <Text style={{fontWeight:'bold',fontSize:18,}}>AVG/Night</Text>
                        </View>
                        <View style={styles.butom}>
                        <Button
                          color="#FF9900"
                        title="Continue" onPress={() => this.Api_dat_hang()} />
                        </View>
                    </View>
                    </View>
        </View>        
       )
   }
}



export default bookRoom;

const styles = StyleSheet.create({
  giaobai_btn: {
    width: '16%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FF5733',
    backgroundColor: "#ffff",
    borderWidth:2,
    marginRight:6,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
},
  daGiaoButton: {
    width: '16%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FF5733',
    backgroundColor: "#FF5733",
    borderWidth:1,
    marginRight:6,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
},
statusText: {
  fontSize: 16,
  color: '#fff'
},
statusText1: {
  fontSize: 16,
  color: '#FF5733'
},
  ckeck:{
    fontWeight:'bold',
    fontSize:18,
    paddingTop:15,
  },
  container: {
    backgroundColor:'#fff',
    flex:1,
  },
  textHeader:{
    flexDirection:'column',
      justifyContent:'center',
      alignItems: 'center',
      justifyContent: 'space-around',
  },
  input: {
    margin:5,
    width:'90%',
    height: 40,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#48BBEC',
    backgroundColor: 'rgba(0,0,0,0)',
},
input1:{
    width:'44%',
    height:40,
    borderWidth:1,
    borderRadius:5,
    borderColor: '#48BBEC',
    backgroundColor: 'rgba(0,0,0,0)',
    margin:5,
},
fromInput:{
    justifyContent:'center',
    alignItems: 'center',
    justifyContent: 'space-around',
},
main:{ 
    marginLeft:'5%',
    paddingTop:10,
    paddingBottom:10,
    width:'90%',
    marginBottom:20,
    borderTopWidth:1,
    borderBottomWidth:1,

},

desc:{
 width:'100%',
 padding:'5%',
},
MainContainer:
  {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
  },

  bottomView:{
      flexDirection:'row',
      borderTopColor:'red',
    width: '100%', 
    height: 80, 
    backgroundColor: '#FFf', 
    alignContent:'center',
    position: 'absolute',
    bottom: 0
  },
  butom:{
     padding: 20,
     paddingLeft:'50%'
  },
});
