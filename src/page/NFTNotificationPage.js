import React, {useState} from 'react';
// import QRCode from 'react-native-qrcode-svg';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight, ImageBackground, Modal, Alert, Pressable } from 'react-native';

const NFTNotificationPage = ({navigation}) => {

  const onAccept = () => {
    navigation.navigate('MetamaskInfoPage')
  }

  const onReject = () => {
    navigation.navigate('MetamaskInfoPage')
  }

  return (
    <View style={styles.container}>

      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <ImageBackground source={require('../../assets/top_background_effect.png')} resizeMode="stretch" style={styles.backgroundImage}>
      </ImageBackground>
      <View style={styles.subContainer}>

        <Text style={styles.IDNumber}>NFT Notification</Text>
        
        <View style={styles.topContainer}>
          {/* <Text style={styles.IDNumber}>NFT Notification</Text> */}
          <View style={styles.rowLine}>
            <Text style={styles.loginEmail}>Time</Text>
            <Text style={styles.lineText}>2023-03-01 12:12:12</Text>
          </View>
          <View style={styles.rowLine}>
            <Text style={styles.loginEmail}>Type</Text>
            <Text style={styles.lineText}>Request for nft</Text>
          </View>
          <View style={styles.rowLine}>
            <Text style={styles.loginEmail}>NFT ID</Text>
            <Text style={styles.lineText}>1167158</Text>
          </View>
          <View style={styles.rowLine}>
            <Text style={styles.loginEmail}>NFT name</Text>
            <Text style={styles.lineText}>Simple</Text>
          </View>
          <View style={styles.rowLine}>
            <Text style={styles.loginEmail}>Sell price</Text>
            <Text style={styles.lineText}>0.1223523452345</Text>
          </View>
          <View style={styles.colLine}>
            <Text style={styles.loginEmail}>Detail</Text>
            <Text style={styles.detailText}>adsfqwerqowepriupaosdfiuqwpoeriuqweporiu</Text>
          </View>
        </View>
        
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    marginTop: 120,
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
    marginTop: 0,
    paddingTop: 20,
    paddingBottom: 30,
    zIndex: -1,
  },
  QRContainer: {
    padding: 12,
    width: 225,
    backgroundColor: "white",
    borderRadius: 12
  },
  metamaskLogo: {
    width: 200,
    height: 200
  },
  memberID: {
    color: "white",
    fontSize: 18,
    marginTop: 105,
    textAlign: "center",
    opacity: 0.6
  },
  IDNumber: {
    color: "black",
    fontSize: 25,
    marginBottom: 50,
    textAlign: "center",
  },
  rowLine: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  colLine: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  rowBtnline: {
    flexDirection: "row"
  },
  lineText: {
    marginLeft: 20,
    fontSize: 18,
    color: "white",
    textAlign: "right",
    width: 200
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
    width: 100,
    color: "white",
    opacity: 0.6
  },
  detailText: {
    fontSize: 18,
    width: "100%",
    color: "white",
    // opacity: 0.6
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
  acceptPinBtn: {
    marginTop: 25,
    backgroundColor: "#ff9406",
    width: "48%",
    padding: 15,
    borderRadius: 15
  },
  rejectPinBtn: {
    marginTop: 25,
    marginLeft: 15,
    backgroundColor: "#7d7d7d",
    width: "48%",
    padding: 15,
    borderRadius: 15
  },
  registerBtnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    opacity: 0.7
  }
});

export default NFTNotificationPage
