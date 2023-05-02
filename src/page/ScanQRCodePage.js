import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, Modal, Image, TouchableHighlight } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AppContext } from '../../utils/AppContext';

export default function ScanQRCodePage() {
  const { memberId, userEmail, setUserEmail, userStatus, setUserStatus } = useContext(AppContext)

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [qrData, setQRData] = useState(null)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setQRData(data)
    console.log("data", data)
    axios.post(`http://218.50.149.74:8545/apis/escare/n2e/vrfccd/v1/verify/verifyVerificationCode`, {
      header: {
        pId: "NV001",
        pVersion: "01"
      },
      memberId: memberId,
      requesterId: memberId,
      verificationCode: data
    }).then(response => {
      console.log("verify", response.data)
      setModalVisible(true)
    }).catch(error => alert("Request Failed"))
  };

  const onContinue = async () => {
    navigation.navigate('HomePage')
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
                  source={require('../../assets/verified.png')}
                  style={styles.walletIconStyle}
            />
            <Text style={styles.walletBigText}>Success</Text>
            <TouchableHighlight
              style={styles.changePinBtn}
              onPress={onContinue}
              underlayColor='#fff'>
                <Text style={styles.registerBtnText}>Ok</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  changePinBtn: {
    marginTop: 35,
    backgroundColor: "#ddecff",
    width: "100%",
    padding:20,
    borderRadius: 15
  },
  registerBtnText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    opacity: 0.7
  },
  buttonMetamaskIconStyle:{
    width: 28,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "85%"
  },
  mmWalletConnectBtn: {
    marginTop: 8,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: "98%"
  },
  mmWalletConnectBtnClose: {
    backgroundColor: '#e37624',
  },
  kkWalletConnectBtn: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: "98%"
  },
  kkWalletConnectBtnClose: {
    backgroundColor: '#3266ff',
  },
  textStyle: {
    color: 'white',
    marginLeft: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
  metamasktextStyle: {
    color: 'white',
    marginLeft: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
  walletContainer: {
    flexDirection: 'row',
    paddingLeft: 50
  },
  kaikasLogoStyle: {
    width: 20,
    height: 20
  },
  whiteCircle: {
    padding: 4,
    backgroundColor: "white",
    borderRadius: 100,
    margin: -3
  },
  metamaskLogoStyle: {
    width: 20,
    height: 20
  },
  walletSmallText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.6
  },
  walletBigText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 22
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: "85%",
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  registerText: {
    // alignItems: "flex-end",
    margin : 8,
    marginTop: 100,
    fontSize: 20
  },
  helloText: {
    // alignItems: "flex-end",
    margin : 8,
    marginTop: 20,
    fontSize: 20
  },
  topContainer: {
    flexDirection: 'row',
    backgroundColor: "#0a3f92",
    height: 180,
    width: "100%",
    borderRadius: 20,
    paddingTop: 15,
    paddingLeft: 12
  },
  BottomContainer: {
    // flexDirection: 'row',
    backgroundColor: "#0a3f92",
    // height: 200,
    width: "100%",
    borderRadius: 20,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    // paddingTop: 15,
    // paddingLeft: 12,
    marginTop: 0
  },
  walletAppContainer: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'row',
    backgroundColor: "#0a3f92",
    height: 60,
    width: "100%",
    borderRadius: 20,
    // paddingTop: 30,
    // paddingLeft: 12,
    padding: 10,
    marginTop: 20,
    // marginBottom: 20
  },
  connectWalletApiiTextStyle: {
    color: "white",
    fontSize: 20,
    marginLeft: 80
  },
  connectWalletAddressTextStyle: {
    color: "white",
    fontSize: 13.5,
    marginLeft: 10
  },
  topButtonContainer: {
    width: 120,
    // borderWidth: 1
  },
  notfButtonContainer: {
    width: "100%",
    // borderWidth: 1
  },
  buttonTouchStyle: {
    // flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#485a96',
    // borderWidth: 0.5,
    // borderColor: '#fff',
    // height: 100,
    borderRadius: 5,
    margin: 5,
  },
  buttonWalletConnectTouchStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#485a96',
    // borderWidth: 0.5,
    // borderColor: '#fff',
    // height: 100,
    borderRadius: 5,
    margin: 5,
  },
  alamAndDateStyle: {
    flexDirection: 'row',
  },
  notfTitleContainerStyle: {
    width: "80%"
  },
  notfbuttonTouchStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22529d',
    // borderWidth: 0.5,
    // borderColor: '#fff',
    height: 60,
    borderRadius: 10,
    paddingLeft: 30,
    marginTop: 8,
    marginBottom: 8
  },
  buttonAlertIconStyle: {
    // padding: 10,
    // margin: 5,
    marginTop: 2,
    marginRight: 16,
    height: 16,
    width: 16,
    resizeMode: 'stretch',
  },
  buttonMailIconStyle: {
    // padding: 10,
    // margin: 5,
    marginTop: 3,
    marginRight: 16,
    height: 14,
    width: 20,
    resizeMode: 'stretch',
  },
  NotfPushIconStyle: {
    // padding: 10,
    // margin: 5,
    // marginTop: 2,
    marginRight: 20,
    height: 24,
    width: 28,
    resizeMode: 'stretch',
  },
  buttonImageIconStyle: {
    // padding: 10,
    margin: 5,
    height: 105,
    width: 100,
    resizeMode: 'stretch',
  },
  walletIconStyle: {
    // padding: 10,
    // margin: 5,
    height: 35,
    width: 35,
    resizeMode: 'stretch',
  },
  buttonTextStyle: {
    color: "white",
  },
  notfDateTextStyle: {
    color: "white",
    opacity: 0.5
  },
  notfMesaageTextStyle: {
    color: "white",
    marginTop: 7
  },

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
  }
});

