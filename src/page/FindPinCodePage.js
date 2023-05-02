import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight } from 'react-native';

const FindPinCodePage = ({navigation}) => {

  const [email, setEmail] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  
  onChangeEmail = (input) => {
    setEmail(input)
  }

  onFindPinContinue = () => {
    navigation.navigate('InputPinCode')
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.RegisterText}>Find PIN Code</Text>
        <TextInput
          style={styles.inputEmail}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email"
          placeholderTextColor="white"
        />
        <TouchableHighlight
          style={styles.loginBtn}
          onPress={() => this.onRegisteContinue()}
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

export default FindPinCodePage
