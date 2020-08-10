import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
  Modal,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

function Booking({ navigation }) {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [users, setUsers] = useState([]);
  const[data,setData]=useState([]);
  const[dataModel,setDataModel]=useState([]);
  const Booking_All = (id) => {
        return fetch('https://quangdev12.000webhostapp.com/api/api_view_booking', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_user:id,
            page: page,
          })
        })
          .then(response => response.json())
          .then((resJson) => {
            console.log('All: ', resJson);
            // this.setState({
            //   loading: false,
            //   all: [...this.state.all, ...resJson],
            // });
            let all= [...data, ...resJson];
            setData(all);
            setLoading(false);
          });
      }
      const handleLoadMore = () => {
         //setLoading(true);
        setPage(page + 1);
       // Booking_All();
    
      };
    const Detail_Booking = (id) => {
          return fetch('https://quangdev12.000webhostapp.com/api/api_view_bill/' + id, {
            method: 'get',
          })
            .then(response => response.json())
            .then(resJson => {
              console.log('log 54: ', resJson);
                setDataModel(resJson);
            });
        }
     
      useFocusEffect(
        React.useCallback(() => {
          AsyncStorage.getItem('login', (err, result) => {
            if (!err && result != null) {
              setUsers( JSON.parse(result));
              let info=JSON.parse(result);
             
              setPage(0);
              Booking_All(info.id);
            }
             
            
          });
          setLoading(true);
        
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
        AsyncStorage.getItem('login', (err, result) => {
          if (!err && result != null) {
            setUsers( JSON.parse(result));
            let info=JSON.parse(result);
           
            setPage(0);
            Booking_All(info.id);
          }
              });
       
      }, []);
  return (
    <View style={styles.container}>
             <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Bill Infomation</Text>
                  <View style={styles.span}>
                    <Text style={styles.text_modal}>Create at : </Text>
                    <Text style={styles.text_modal_2}>
                      {dataModel.create_at}
                    </Text>
                  </View>
                  <View style={styles.span}>
                    <Text style={styles.text_modal}>Custom name : </Text>
                    <Text style={styles.text_modal_2}>{dataModel.name}</Text>
                  </View>
                  <View style={styles.span}>
                    <Text style={styles.text_modal}>Check in : </Text>
                    <Text style={styles.text_modal_2}>
                      {dataModel.check_in}
                    </Text>
                  </View>
                  <View style={styles.span}>
                    <Text style={styles.text_modal}>Email : </Text>
                    <Text style={styles.text_modal_2}>{dataModel.email}</Text>
                  </View>
                  <View style={styles.span}>
                    <Text style={styles.text_modal}>Phone : </Text>
                    <Text style={styles.text_modal_2}>{dataModel.phone}</Text>
                  </View>
                  <View style={styles.span}>
                    <Text style={styles.text_modal}>Hotel name : </Text>
                    <Text style={styles.text_modal_2}>
                      {dataModel.hotel_name}
                    </Text>
                  </View>
                  <View style={styles.span}>
                    <Text style={styles.text_modal}>Hotel address : </Text>
                    <Text style={styles.text_modal_2}>
                      {dataModel.hotel_address}
                    </Text>
                  </View>
                  <View style={styles.span}>
                    <Text style={styles.text_modal}>Type Room : </Text>
                    <Text style={styles.text_modal_2}>
                      {dataModel.type_name}
                    </Text>
                  </View>
                  <View style={styles.span}>
                    <Text style={styles.text_modal}>Number of Room : </Text>
                    <Text style={styles.text_modal_2}>
                      {dataModel.so_luong}
                    </Text>
                  </View>
                  <View style={styles.span}>
                    <Text style={styles.text_modal}>Total Price : </Text>
                    <Text style={styles.text_modal_2}>{dataModel.price}</Text>
                  </View>
                  <TouchableHighlight
                    style={{...styles.openButton, backgroundColor: '#FF9900'}}
                    onPress={() => {
                    setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.textStyle}>Close</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
    
             {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <FlatList
                data={data}
                onEndReached={handleLoadMore}
                keyExtractor={item => item.id_bill}
                renderItem={({item}) => (
                  <>
                    <View style={styles.main}>
                      <View style={styles.left}>
                        <Text
                          style={{
                            fontSize: 36,
                            fontWeight: 'bold',
                            color: '#FF9900',
                            alignContent: 'center',
                            marginLeft: '25%',
                          }}>
                          {' '}
                          {item.date}{' '}
                        </Text>
                        <Text style={{fontSize: 26, marginLeft: '30%'}}>
                          {' '}
                          {item.month}{' '}
                        </Text>
                      </View>
                      <View style={styles.right}>
                        <View style={styles.span}>
                          <Text style={{fontWeight: 'bold', fontSize: 22}}>
                            {item.hotel_name}
                          </Text>
                          
                        </View>
                        <View style={styles.span}>
                          <Text style={styles.text}>Booking date :</Text>
                          <Text style={styles.text1}> {item.check_in}</Text>
                        </View>
                        <View style={styles.span}>
                          <Text style={styles.text}>Booking details : </Text>
                          <Text style={styles.text1}>{item.so_phong} room</Text>
                        </View>
                        <View style={styles.span}>
                          <Text style={styles.text}>Client : </Text>
                          <Text style={styles.text1}>{item.name}| </Text>
                          <Text style={styles.text1}> {item.phone} </Text>
                         
                        </View>
                        <View style={styles.span}>
                          <Text style={styles.text}>Status : </Text>
                          {item.status == 0 ? (
                            <Text style={styles.textWait}>Waiting</Text>
                          ) : item.status == 1 ? (
                            <Text style={styles.textRec}>Recrived</Text>
                          ) : (
                            <Text style={styles.textCan}>Canceled</Text>
                          )}
                         
                        </View>
                        <View style={{width: '40%', paddingTop: 10}}>
                          <Button
                            color="#3f878a"
                            onPress={() => {
                             setModalVisible(true);
                             Detail_Booking(item.id_bill);
                            }}
                            title="View"
                          />
                        </View>
                      </View>
                    </View>
                  </>
                )}
              />
            )}
           </View>
  );
}


// class Booking extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       all: [],
//       uesr: [],
//       page: 0,
//       loading: true,
//       modalVisible: false,
//       detail_Booking: [],
//     }
//   }

//   Booking_All = () => {
//     return fetch('https://quangdev12.000webhostapp.com/api/api_view_booking', {
//       method: 'post',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         id_user: this.state.uesr.id,
//         page: this.state.page,
//       })
//     })
//       .then(response => response.json())
//       .then((resJson) => {
//         console.log('All: ', resJson);
//         this.setState({
//           loading: false,
//           all: [...this.state.all, ...resJson],
//         });
//       });
//   }
//   Detail_Booking = (id) => {
//     return fetch('https://quangdev12.000webhostapp.com/api/api_view_bill/' + id, {
//       method: 'get',
//     })
//       .then(response => response.json())
//       .then(resJson => {
//         console.log('log 54: ', resJson);
//         this.setState({
//           loading: false,
//           detail_Booking: resJson,
//         });
//       });
//   }

//   setModalVisible = (visible) => {
//     this.setState({ modalVisible: visible });
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.updateHotelList !== this.props.updateHotelList) {
   
//       AsyncStorage.getItem('login', (err, result) => {
      
//           this.setState({ uesr: JSON.parse(result) })
//           this.setState({ loading: true,page:0 });

//       });
//       this.Booking_All();
//       this.props.dispatch({ type: 'UPDATE_HOTEL_LIST', payload: 0 })
//     }
//   }



//   handleLoadMore = () => {
//     this.setState(
//       {
//         page: this.state.page + 1,
//       },
//       () => {
//         this.Booking_All();
//       },
//     );
//   };

//   componentDidMount() {
//     AsyncStorage.getItem('login', (err, result) => {
//       if (!err && result != null) {
//         this.setState({ uesr: JSON.parse(result) })
//         this.Booking_All();
//       }
//     });
//   }

//   render() {
//     const detail_Booking = this.state.detail_Booking;
//     const modalVisible = this.state.modalVisible;

//     let all_booking = this.state.all;
//     return (
//       <View style={styles.container}>
//         {/* <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => {
//             Alert.alert('Modal has been closed.');
//           }}>
//           <View style={styles.centeredView}>
//             <View style={styles.modalView}>
//               <Text style={styles.modalText}>Bill Infomation</Text>
//               <View style={styles.span}>
//                 <Text style={styles.text_modal}>Create at : </Text>
//                 <Text style={styles.text_modal_2}>
//                   {detail_Booking.create_at}
//                 </Text>
//               </View>
//               <View style={styles.span}>
//                 <Text style={styles.text_modal}>Custom name : </Text>
//                 <Text style={styles.text_modal_2}>{detail_Booking.name}</Text>
//               </View>
//               <View style={styles.span}>
//                 <Text style={styles.text_modal}>Check in : </Text>
//                 <Text style={styles.text_modal_2}>
//                   {detail_Booking.check_in}
//                 </Text>
//               </View>
//               <View style={styles.span}>
//                 <Text style={styles.text_modal}>Email : </Text>
//                 <Text style={styles.text_modal_2}>{detail_Booking.email}</Text>
//               </View>
//               <View style={styles.span}>
//                 <Text style={styles.text_modal}>Phone : </Text>
//                 <Text style={styles.text_modal_2}>{detail_Booking.phone}</Text>
//               </View>
//               <View style={styles.span}>
//                 <Text style={styles.text_modal}>Hotel name : </Text>
//                 <Text style={styles.text_modal_2}>
//                   {detail_Booking.hotel_name}
//                 </Text>
//               </View>
//               <View style={styles.span}>
//                 <Text style={styles.text_modal}>Hotel address : </Text>
//                 <Text style={styles.text_modal_2}>
//                   {detail_Booking.hotel_address}
//                 </Text>
//               </View>
//               <View style={styles.span}>
//                 <Text style={styles.text_modal}>Type Room : </Text>
//                 <Text style={styles.text_modal_2}>
//                   {detail_Booking.type_name}
//                 </Text>
//               </View>
//               <View style={styles.span}>
//                 <Text style={styles.text_modal}>Number of Room : </Text>
//                 <Text style={styles.text_modal_2}>
//                   {detail_Booking.so_luong}
//                 </Text>
//               </View>
//               <View style={styles.span}>
//                 <Text style={styles.text_modal}>Total Price : </Text>
//                 <Text style={styles.text_modal_2}>{detail_Booking.price}</Text>
//               </View>
//               <TouchableHighlight
//                 style={{...styles.openButton, backgroundColor: '#FF9900'}}
//                 onPress={() => {
//                   this.setModalVisible(!modalVisible);
//                 }}>
//                 <Text style={styles.textStyle}>Close</Text>
//               </TouchableHighlight>
//             </View>
//           </View>
//         </Modal> */}

//         {this.state.loading ? (
//           <ActivityIndicator size="large" />
//         ) : (
//           <FlatList
//             data={all_booking}
//             onEndReached={this.handleLoadMore}
//             keyExtractor={item => item.id_bill}
//             renderItem={({item}) => (
//               <>
//                 <View style={styles.main}>
//                   <View style={styles.left}>
//                     <Text
//                       style={{
//                         fontSize: 36,
//                         fontWeight: 'bold',
//                         color: '#FF9900',
//                         alignContent: 'center',
//                         marginLeft: '25%',
//                       }}>
//                       {' '}
//                       {item.date}{' '}
//                     </Text>
//                     <Text style={{fontSize: 26, marginLeft: '30%'}}>
//                       {' '}
//                       {item.month}{' '}
//                     </Text>
//                   </View>
//                   <View style={styles.right}>
//                     <View style={styles.span}>
//                       <Text style={{fontWeight: 'bold', fontSize: 22}}>
//                         {item.hotel_name}
//                       </Text>
                      
//                     </View>
//                     <View style={styles.span}>
//                       <Text style={styles.text}>Booking date :</Text>
//                       <Text style={styles.text1}> {item.check_in}</Text>
//                     </View>
//                     <View style={styles.span}>
//                       <Text style={styles.text}>Booking details : </Text>
//                       <Text style={styles.text1}>{item.so_phong} room</Text>
//                     </View>
//                     <View style={styles.span}>
//                       <Text style={styles.text}>Client : </Text>
//                       <Text style={styles.text1}>{item.name} |</Text>
//                       <Text style={styles.text1}> {item.email} </Text>
//                     </View>
//                     <View style={styles.span}>
//                       <Text style={styles.text}>Status : </Text>
//                       {item.status == 0 ? (
//                         <Text style={styles.textWait}>Waiting</Text>
//                       ) : item.status == 1 ? (
//                         <Text style={styles.textRec}>Recrived</Text>
//                       ) : (
//                         <Text style={styles.textCan}>Canceled</Text>
//                       )}
                     
//                     </View>
//                     <View style={{width: '40%', paddingTop: 10}}>
//                       <Button
//                         color="#3f878a"
//                         onPress={() => {
//                           this.setModalVisible(true);
//                           this.Detail_Booking(item.id_bill);
//                         }}
//                         title="View"
//                       />
//                     </View>
//                   </View>
//                 </View>
//               </>
//             )}
//           />
//         )}
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  textWait: {
    width:60,
    height:20,
    backgroundColor: '#f5a851',
    color:'#fff' ,
    textAlign:'center',
  },
  textRec: {
    width:60,
    height:20,
    backgroundColor: '#068a29',
    color:'#fff' ,
    textAlign:'center',
  },
  textCan: {
    width:70,
    height:20,
    backgroundColor: '#d94545',
    color:'#fff' ,
    textAlign:'center',
  },
  container: {
    backgroundColor: '#fff',
  },
  main: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-around',
  },
  left: {
    margin: 20,
    backgroundColor: '#ffe6e6',
    width: '30%',
    justifyContent: 'center',
  },
  right: {
    marginLeft: 10,
    width: '68%',
  },
  span: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text1: {
    fontSize: 16,
    padding: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    marginTop: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  text_modal: {
    fontSize: 18,
    fontWeight: '400',
  },
  text_modal_2: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Booking;
