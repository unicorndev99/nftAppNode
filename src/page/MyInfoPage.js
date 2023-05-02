import React, {useContext, useState} from 'react';
import QRCode from 'react-native-qrcode-svg';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TouchableHighlight, ImageBackground, Modal, Alert, Pressable } from 'react-native';
import { AppContext } from '../../utils/AppContext';

const MyInfoPage = ({navigation}) => {

  const { setUserStatus, memberId, userEmail, loginDate } = useContext(AppContext)

  const onChangePinCode = () => {
    // navigation.navigate('MetamaskInfoPage')
    setUserStatus("ResetPin")
    navigation.navigate('InputPinCode')
  }

  const onBack = () => {
    navigation.navigate('HomePage')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtnContainer} onPress={onBack}>
        <Image source={require('../../assets/backbtn1.png')} style={styles.backbtn} />
      </TouchableOpacity>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <ImageBackground source={require('../../assets/top_background_effect.png')} resizeMode="stretch" style={styles.backgroundImage}>
      </ImageBackground>
      <View style={styles.subContainer}>
        <View style={styles.QRContainer}>
          <QRCode
            size={200}
            value={memberId}
          />
        </View>
        
        <View style={styles.topContainer}>
          <Text style={styles.memberID}>Member ID</Text>
          <Text style={styles.IDNumber}>{memberId}</Text>
          <View style={styles.rowLine}>
            <Text style={styles.loginEmail}>Login Email</Text>
            <Text style={styles.lineText}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
          </View>
          <Text style={styles.emailText}>{userEmail}</Text>
          <View style={styles.rowLine}>
            <Text style={styles.loginEmail}>Login DateTime</Text>
            <Text style={styles.lineTextDate}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
          </View>
          <Text style={styles.dateText}>{loginDate}</Text>
        </View>

        <TouchableHighlight
          style={styles.changePinBtn}
          onPress={onChangePinCode}
          underlayColor='#fff'>
            <Text style={styles.registerBtnText}>Change Pin Code</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    width: "100%",
    height: 220,
    top: 80
  },
  logo: {
    position: 'absolute',
    top: 50,
    width :55,
    height : 55,
  },
  backBtnContainer:{
    position: 'absolute',
    top: 20,
    left: 20,
    width : 28,
    height : 22,
  },  
  backbtn: {
    width : 28,
    height : 22,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    marginTop: 100,
    width: "85%",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    backgroundColor: "#0a3f92",
    // height: 180,
    width: "100%",
    borderRadius: 20,
    marginTop: -100,
    zIndex: -1,
  },
  QRContainer: {
    padding: 12,
    width: 225,
    backgroundColor: "white",
    borderRadius: 12
  },
  memberID: {
    color: "white",
    fontSize: 18,
    marginTop: 105,
    textAlign: "center",
    opacity: 0.6
  },
  IDNumber: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
  },
  rowLine: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  lineText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    marginLeft: 50,
    fontSize: 18,
    color: "white",
    opacity: 0.6

  },
  lineTextDate: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    marginLeft: 18,
    fontSize: 18,
    color: "white",
    opacity: 0.6

  },
  loginEmail: {
    fontSize: 18,
    color: "white",
    opacity: 0.6
  },
  emailText: {
    color: "white",
    fontSize: 22,
    marginLeft: 30,
    marginBottom: 10
  },
  dateText: {
    color: "white",
    fontSize: 22,
    marginLeft: 30,
    marginBottom: 40
  },
  changePinBtn: {
    marginTop: 45,
    backgroundColor: "#ddecff",
    width: "100%",
    padding: 20,
    borderRadius: 15
  },
  registerBtnText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    opacity: 0.7
  }
});

export default MyInfoPage
