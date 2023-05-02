import React, {useState, useContext, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight } from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import { AppContext } from '../../utils/AppContext';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from "axios";

const InputCodeViaEmail = ({navigation}) => {

  const [emailCode, setEmailCode] = useState(null);
  const [error, setError] = useState(null);
  const { userEmail, setUserEmail, setUserStatus, memberId, setMemberId } = useContext(AppContext)
  const ref = useRef();

  const onRegisteContinue = () => {
    axios.post(`http://218.50.149.74:8545/apis/escare/n2e/kyc/v1/email/${userEmail}/authcode`, {
      authCode: emailCode,
      type: "SIGNUP"
    }).then(response => {
      console.log("send email Code", response.data)
      setMemberId(response.data.memberId)
      navigation.navigate('InputPinCode')
    }).catch(error => {
      setError(error)
    })

  }

  const onCheckCode = async (code) => {
    console.log("code", code)
    setEmailCode(code)
  }

  const onCodeChange = async (code) => {
    console.log("onCodeChange", code)
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.RegisterText}>Input code sent via Email</Text>
        <CodeInput
          ref={ref}
          codeLength={6}
          secureTextEntry
          // compareWithCode='AsDW2d'
          activeColor='white'
          inactiveColor='white'
          autoFocus={false}
          ignoreCase={true}
          inputPosition='center'
          size={50}
          onFulfill={(code) => onCheckCode(code)}
          onCodeChange={(code) => onCodeChange(code)}
          containerStyle={{ marginTop: 30 }}
          codeInputStyle={{ borderWidth: 1, borderColor: "white", borderRadius: 5, opacity: 0.8 }}
        />
        {
          error && <View style={styles.errorContainer}>
              <Icon name="exclamationcircle" size={20} color="#c9ad1e" />
              <Text style={styles.wrongText}>Wrong code. Try again please</Text>
            </View>
        }
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
  errorContainer: {
    flexDirection: 'row',
    marginTop: 60
  },
  wrongText: {
    fontSize: 15,
    color: "#c9ad1e",
    marginLeft: 10
  },  
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
    marginTop: 105,
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

export default InputCodeViaEmail
