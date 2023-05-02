import React, {useContext, useEffect, useState} from 'react';
import Web3 from "web3";
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TouchableHighlight, ImageBackground, Modal, Alert, Pressable } from 'react-native';
import { AppContext } from '../../utils/AppContext';

const MetamaskInfoPage = ({navigation}) => {

  const { setWalletType, walletAddress, setWalletAddress, evmConnector, loginDate } = useContext(AppContext)
  const [ remainAmount, setRemainAmount ] = useState(0)

  useEffect(() => {
    getBalance();
    async function getBalance() {
      const url = "https://eth-rpc.gateway.pokt.network"
      const web3 = new Web3(new Web3.providers.HttpProvider(url));
      const balance = await web3.eth.getBalance(walletAddress);
      console.log("balance", balance)
      setRemainAmount(balance)
    }
  }, [walletAddress])

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
          <Image source={require('../../assets/metamask_icon.png')} style={styles.metamaskLogo} />
        </View>
        
        <View style={styles.topContainer}>
          <Text style={styles.IDNumber}>Wallet Info</Text>
          <View style={styles.rowLine}>
            <Text style={styles.loginEmail}>Wallet Address</Text>
          </View>
          <Text style={styles.emailText}>{walletAddress}</Text>

          <View style={styles.rowLine}>
            <Text style={styles.loginEmail}>Remain amount</Text>
          </View>
          <Text style={styles.emailText}>{remainAmount}</Text>
          
          <View style={styles.rowLine}>
            <Text style={styles.loginEmail}>Connected Site</Text>
          </View>
          <View style={styles.rowImageLine}>
            <Image source={require('../../assets/siteicon.png')} style={styles.lineLogo} />
            <Text style={styles.emailComText}>www.escarenftmarketplace.com</Text>
          </View>

          <View style={styles.rowLine}>
            <Text style={styles.loginEmail}>Connection Time</Text>
          </View>
          <Text style={styles.emailText}>{ loginDate }</Text>
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
  lineLogo:{
    width: 25,
    height: 25
  },
  metamaskLogo: {
    width: 200,
    height: 200
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    marginTop: 150,
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
    paddingBottom: 30,
    paddingRight: 30,
    zIndex: -1,
  },
  QRContainer: {
    padding: 12,
    width: 225,
    backgroundColor: "white",
    borderRadius: 20
  },
  IDNumber: {
    marginTop: 110,
    color: "white",
    fontSize: 25,
    textAlign: "center",
    marginLeft: 30
    // opacity: 0.8
  },
  rowLine: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  rowImageLine: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 35,
    marginRight: 10,
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
    fontSize: 16,
    marginTop: 3,
    marginLeft: 30,
    marginBottom: 2
  },
  emailComText: {
    color: "white",
    fontSize: 18,
    // marginTop: 2,
    marginLeft: 15,
    marginBottom: 2
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

export default MetamaskInfoPage
