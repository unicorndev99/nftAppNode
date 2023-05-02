import React, {useContext, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight } from 'react-native';
import { AppContext } from '../../utils/AppContext';
import axios from "axios";

const RegistePage = ({navigation}) => {

  const [email, setEmail] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const { userEmail, setUserEmail, userStatus, setUserStatus } = useContext(AppContext)
  
  const onChangeEmail = (input) => {
    setEmail(input)
  }

  const onRegisteContinue = async () => {
    axios.get(`http://218.50.149.74:8545/apis/escare/n2e/kyc/v1/email/${email}/authcode`).then(response => {
      console.log(response.data)
      setUserEmail(email)
      setUserStatus("Register")
      navigation.navigate('InputCodeViaEmail')
    }).catch(error => console.log("register api error", error))
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.RegisterText}>
          {
            userStatus === "RegisterForPin" ? "Find Pin Code" : "Register"
          }
        </Text>
        <TextInput
          style={styles.inputEmail}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email"
          placeholderTextColor="white"
        />
        <TouchableHighlight
          style={styles.loginBtn}
          onPress={() => onRegisteContinue()}
          underlayColor='#fff'>
            <Text style={styles.loginBtnText}>Continue</Text>
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
  RegisterText: {
    fontSize: 30,
    textAlign: "center",
    color: "white"
  },  
  inputEmail: {
    marginTop: 30,
    paddingTop: 10,
    paddingLeft: 15,
    paddingBottom: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
  },
  loginBtn: {
    marginTop: 25,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  loginBtnText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20
  }
});

export default RegistePage
