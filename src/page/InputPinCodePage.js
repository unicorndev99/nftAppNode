import React, {useContext, useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight } from 'react-native';
import { PinCode, PinCodeT, hasSetPIN, clearPIN } from '@anhnch/react-native-pincode';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppContext } from '../../utils/AppContext';
import axios from 'axios';
import CryptoJS from "react-native-crypto-js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hashKey } from '../../utils/pinCodeKey';

const InputPinCodepage = ({navigation}) => {

  const { userStatus, setUserStatus, setMemberId, memberId, setLoginDate } = useContext(AppContext)
  const [ mode, setMode ] = useState(PinCodeT.Modes.Enter)

  useEffect(() => {
    if(userStatus === "AutoLogin") {
      autoLogin();
    }

    async function autoLogin(){
      let hashPinCode = await AsyncStorage.getItem("hashPinCode");
      if(hashPinCode) {
        let hashMemberId = await AsyncStorage.getItem("hashMemberId");
        let userMemberId = CryptoJS.AES.decrypt(hashMemberId, hashKey).toString(CryptoJS.enc.Utf8);
        console.log("decrypt", userMemberId)
        setMemberId(userMemberId)

        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        let hours = new Date().getHours(); //To get the Current Hours
        let min = new Date().getMinutes(); //To get the Current Minutes
        let sec = new Date().getSeconds(); //To get the Current Seconds

        setLoginDate(`${year}-${month}-${date} ${hours}:${min}:${sec}`)
        navigation.navigate('HomePage')  // do autologin Auth
      }
    }
  }, [userStatus])
  
  const setNewPin = async (pin) => {
    console.log("pin", pin)

    let hashPinCode = CryptoJS.AES.encrypt(pin, hashKey).toString();

    try {
      // let response = await axios.post(`http://218.50.149.74:8545/apis/escare/n2e/kyc/v1/member/${memberId}/pin`, {
      //   hashedPin: hashPinCode
      // })
      // console.log("send pin set", response.data)
      let hashMemberId = CryptoJS.AES.encrypt(memberId, hashKey).toString();
      await AsyncStorage.setItem("hashMemberId", hashMemberId)
      await AsyncStorage.setItem("@pincode", hashPinCode)
      console.log("set", hashPinCode)
      navigation.navigate('Login')
    } catch (error) {
      console.log("send pin", error)
    }
  }

  const enterPin = async (pin) => {
    if(userStatus === "ResetPin") setMode(PinCodeT.Modes.Set)
    else {
      let hashMemberId = await AsyncStorage.getItem("hashMemberId");
      let userMemberId = CryptoJS.AES.decrypt(hashMemberId, hashKey).toString(CryptoJS.enc.Utf8);
      console.log("decrypt", userMemberId)
      setMemberId(userMemberId)
  
      let date = new Date().getDate();
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      let hours = new Date().getHours(); //To get the Current Hours
      let min = new Date().getMinutes(); //To get the Current Minutes
      let sec = new Date().getSeconds(); //To get the Current Seconds

      setLoginDate(`${year}-${month}-${date} ${hours}:${min}:${sec}`)
      navigation.navigate('HomePage')
    }
  }

  const resetPin = async (pin) => {
    console.log("right", pin)
  }
  const showStrage = async (pin) => {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    console.log("alll", result)
  }

  const checkPin = async (pin) => {
    console.log("checkPin", pin)
    const pinHashCode = await AsyncStorage.getItem("@pincode");
    let decryptPin = CryptoJS.AES.decrypt(pinHashCode, hashKey).toString(CryptoJS.enc.Utf8);
    return (decryptPin && decryptPin === pin)
  }

  const onFindPinCode = async () => {
    console.log("herer")
    setUserStatus("RegisterForPin")
    navigation.navigate('Registe')
  }

  useEffect(() => {
    showStrage();
    if(userStatus === "Login") setMode(PinCodeT.Modes.Enter)
    else if(userStatus === "Register") setMode(PinCodeT.Modes.Set)
    else if(userStatus === "ResetPin") setMode(PinCodeT.Modes.Enter)
    
  }, [userStatus])
  console.log("UserStatus", userStatus)

  
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} /> 
      <PinCode mode={mode} visible={true} 
        styles={pincodeStyle} 
        options={pincodeOption}
        textOptions={pincodeText}
        onSetSuccess={(newPin) => setNewPin(newPin)}
        onEnterSuccess={(pin) => enterPin(pin)}
        checkPin={async (pin) => checkPin(pin)}
      />
      <TouchableHighlight
          style={styles.findPinBtn}
          onPress={() => onFindPinCode()}
          underlayColor='#fff'>
            <Text style={styles.FindPinBtnText}>Find Pin Code</Text>
        </TouchableHighlight>
    </View>
  );
}

const pincodeOption = {
  pinLength: 6,
  maxAttempt: 4,
  lockDuration: 10000,
  allowedReset: true,
  disableLock: false,
  backSpace: <Icon name='backspace' size={40} color='black' />,
  lockIcon: <Icon name='lock' size={24} color='white' />
}
const pincodeText = {
  enter: {
    title: 'Input Pin Code',
    subTitle: 'custom sub title',
    error: 'wrong PIN',
    backSpace: 'del',
  },
  set: {
    title: 'Input pin Code For Set',
    subTitle: 'custom sub title',
    repeat: 'Confirm Pin Code',
    error: `repeated PIN doesn't match`,
    cancelText: 'Cancel'
  },
  locked: {
    title: 'You typed wrong several times',
    subTitle: ' ',
    lockedText: 'locked'
  }
}
const pincodeStyle = {
  main: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 99, backgroundColor: "transparent" },
  enter: {
    titleContainer: { padding: 40, marginTop: 150 },
    title: { color: 'white', fontSize: 30 },
    subTitle: { display: "none" },
    buttonContainer: { width : "120%", backgroundColor: "white", marginTop: 180, paddingTop: 0, paddingBottom:50,  },
    buttonText: { color: 'black', fontSize: 20 },
    buttons: { backgroundColor: 'white',   },
    footer: {  },
    footerText: { color: 'white', margin: 0, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5 },
    pinContainer: { height : 20 },
  },
  locked: {
    // titleContainer: { borderWidth: 1 },
    title: { color: 'yellow' },
    subTitle: { color: 'red' },
    clockContainer: { borderWidth: 1 },
    clockText: { color: 'red' },
    locked: { color: 'yellow' }
  },
  set: {
    repeat: {color: 'red', fontSize: 30 }
  },
  reset: {
    titleContainer: { borderWidth: 1 },
    title: { color: 'yellow' },
    subTitle: { color: 'red' },
    buttons: { backgroundColor: 'green' }
  }
}
const styles = StyleSheet.create({
  FindPinBtnText: {
    color: 'white',
    textAlign: 'center',
    margin: 7
  },  
  findPinBtn: {
    position: 'absolute',
    top : 350,
    borderWidth: 0.8,
    borderColor: "white",
    borderRadius: 10,
    height: 35,
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 1000
  },
  container: {
    flex: 1,
    backgroundColor: '#0a3f92',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    top: 50,
    width :55,
    height : 55,
  }
});

export default InputPinCodepage
