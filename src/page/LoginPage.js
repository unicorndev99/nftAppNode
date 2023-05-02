import React, {useContext, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight } from 'react-native';
import CheckBox from 'expo-checkbox';
import axios from "axios";

import { AppContext } from '../../utils/AppContext';

export default function LoginPage({navigation}) {

  const [email, setEmail] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);

  const { userEmail, setUserEmail, setUserStatus, setMemberId } = useContext(AppContext)
  
  onChangeEmail = (input) => {
    setEmail(input)
  }

  const onLogin = async () => {
    setUserEmail(email)
    setMemberId("123123123123")
    autoLogin ? setUserStatus("AutoLogin") : setUserStatus("Login")
    navigation.navigate('InputPinCode')
  }

  const onRegister = () => {
    // setUserStatus("Register") // will remove
    // navigation.navigate('InputPinCode') // will remove
    navigation.navigate('Registe')
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/escare_nft_logo.png')} style={{width: 140, height: 100}} />  
      <View style={styles.subContainer}>
        <TextInput
          style={styles.inputEmail}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email"
          placeholderTextColor="white"
        />
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={autoLogin}
            onValueChange={setAutoLogin}
            style={styles.autoLogin}
          />
          <Text style={styles.autoLoginText}>AutoLogin</Text>
        </View>
        <TouchableHighlight
          style={styles.loginBtn}
          onPress={() => onLogin()}
          underlayColor='#fff'>
            <Text style={styles.loginBtnText}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.registerBtn}
          onPress={() => onRegister()}
          underlayColor='#fff'>
            <Text style={styles.registerBtnText}>Register</Text>
        </TouchableHighlight>
      </View>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a3f92',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: "60%",
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 20,
    // flex: 1,
    // alignItems: 'flex-end'
  },
  inputEmail: {
    marginTop: 60,
    paddingTop: 10,
    paddingLeft: 15,
    paddingBottom: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
  },
  autoLogin: {
    marginLeft: 175
  },
  autoLoginText: {
    marginLeft: 10,
    color: "white"
  },
  loginBtn: {
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  loginBtnText: {
    color: 'black',
    textAlign: 'center',
  },
  registerBtn: {
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    marginLeft: 70,
    marginRight: 70
  },
  registerBtnText: {
    color: 'white',
    textAlign: 'center',
  }
});
