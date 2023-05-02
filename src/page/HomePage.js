import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ImageBackground, Modal, Alert, Pressable, Linking } from 'react-native';
import { AppContext } from '../../utils/AppContext';

const HomePage = ({navigation}) => {

  const [notificationData, setNotificationData] = useState([
    { notfType: "notification", transTime: "2023-03-01 12:12", title: "Request for NFT is received", msg_id: "13" , body: "Test Message!!" },
    { notfType: "sellrequest", transTime: "2023-03-01 12:12", title: "Request for NFT is received", msg_id: "13" , body: "Test Message!!" },
    { notfType: "notification", transTime: "2023-03-01 12:12", title: "Request for NFT is received", msg_id: "13" , body: "Test Message!!" },
  ]);
  const [modalVisible, setModalVisible] = useState(true);
  const { setWalletType, walletAddress, setWalletAddress, evmConnector, memberId } = useContext(AppContext)

  useEffect(() => {
    getPushList();
    async function getPushList(){
      axios.post(`http://218.50.149.74:8545/apis/escare/push/v1/requestPushMsgList`, {
          index: 1,
          memberId: memberId,
          msgInqToken: "3d5934941c2b4b076b6c887b801999cbef5fbe540337acd9837a8a2b6c5debfa",
          searchCount: 10
      }).then(response => {
        console.log("verify", response.data.messages)
        const messageList = response.data.messages;
        let pushList = messageList.map((list) => {
          return list
        })
        setNotificationData(pushList)
      }).catch(error => alert("Request Failed"))
    }
  })

  const onVerifyNFT = () => {
    navigation.navigate('ScanQRCodePage')
    // navigation.navigate('NFTNotificationPage')

  }

  const onClickNotification = (list) => {
    console.log("click")
    if(list.notfType === "sellrequest") {
      navigation.navigate('NFTSellNFTPage', { list })

    } else {
      navigation.navigate('NFTNotificationPage', { list })
    }

  }

  const onVerifyOwner = () => {
    navigation.navigate('ScanQRCodePageForOwner')

  }

  const onWalletInfo = () => {
    navigation.navigate('MetamaskInfoPage')

  }

  const onMyInfo = () => {
    navigation.navigate('MyInfoPage')
  }

  const walletLogin = async (walletType) => {
    if (walletType === "metamask") {
      const wallet = await evmConnector.connect()

      // axios.get(`http://218.50.149.74:8545/apis/escare/n2e/kyc/v1/member/${memberId}/wallet`).then(response => {
      //   console.log("wallet register", response.data)
      //   // setUserEmail(email)
      //   // setUserStatus("Register")
      //   // navigation.navigate('InputCodeViaEmail')
      // }).catch(error => console.log("register api error", error))


      console.log("metamask", wallet, evmConnector)
      setWalletAddress(wallet.accounts[0])
      setWalletType("metamask")
      setModalVisible(false)
    } else if (walletType === "kaikas") {
      setModalVisible(false)
      // // const url = 'http://localhost'; // Replace with your desired URL
      // const url = 'https://u.expo.dev/4efbefe3-19cd-4fc4-81bf-2e91f2882dd8'; // Replace with your desired URL
      // const kaikasUrl = `kaikas://wallet/app`;
      // // const kaikasUrl = "kaikas://wallet/browser?url=" + encodeURIComponent();
      // console.log("kai", kaikasUrl)
      
      // const canOpen = await Linking.canOpenURL(kaikasUrl);
      // if (canOpen) {
      //   const kaikaswallet = await Linking.openURL(kaikasUrl);
      //   // const address = await Linking.getInitialURL();
      //   console.log("kaikaswallet", kaikaswallet)
      // } else {
      //   console.log(`Cannot open URL: ${kaikasUrl}`);
      // }
    }
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
                  source={require('../../assets/connectwallet_logo.png')}
                  style={styles.walletIconStyle}
            />
            <Text style={styles.walletBigText}>Connect Wallet</Text>
            <Text style={styles.walletSmallText}>Please select method to connect</Text>
            <Pressable
              style={[styles.kkWalletConnectBtn, styles.kkWalletConnectBtnClose]}
              onPress={() => walletLogin("kaikas")}>
              <View style={styles.walletContainer}>
                  <Image
                      source={require('../../assets/kaikas.png')}
                      style={styles.kaikasLogoStyle}
                  />
                <Text style={styles.textStyle}>Kaikas</Text>
              </View>
            </Pressable>

            <Pressable
              style={[styles.mmWalletConnectBtn, styles.mmWalletConnectBtnClose]}
              onPress={() => walletLogin("metamask")}>
              <View style={styles.walletContainer}>
                <View style={styles.whiteCircle}>
                  <Image
                      source={require('../../assets/metamask.png')}
                      style={styles.metamaskLogoStyle}
                  />
                </View>
                <Text style={styles.metamasktextStyle}>MetaMask</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <ImageBackground source={require('../../assets/top_background_effect.png')} resizeMode="stretch" style={styles.backgroundImage}>
      </ImageBackground>
      <View style={styles.subContainer}>
        <Text style={styles.registerText}>Register</Text>

        <View style={styles.topContainer}>
          <View style={styles.topButtonContainer}>
            <TouchableOpacity
            style={styles.buttonTouchStyle}
            activeOpacity={0.2} onPress={onVerifyNFT} >
              <Image
                source={require('../../assets/nftverify.png')}
                style={styles.buttonImageIconStyle}
              />
              <View style={styles.buttonIconSeparatorStyle} />
              <Text style={styles.buttonTextStyle}>Verify NFT</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.topButtonContainer}>
            <TouchableOpacity
            style={styles.buttonTouchStyle}
            activeOpacity={0.2} onPress={onVerifyOwner}>
              <Image
                source={require('../../assets/userverify.png')}
                style={styles.buttonImageIconStyle}
              />
              <View style={styles.buttonIconSeparatorStyle} />
              <Text style={styles.buttonTextStyle}>Verify Owner</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.topButtonContainer}>
            <TouchableOpacity
            style={styles.buttonTouchStyle}
            activeOpacity={0.2} onPress={onMyInfo}>
              <Image
                source={require('../../assets/myinfo.png')}
                style={styles.buttonImageIconStyle}
              />
              <View style={styles.buttonIconSeparatorStyle} />
              <Text style={styles.buttonTextStyle}>My Info</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.walletAppContainer}>
          <TouchableOpacity
              style={styles.buttonWalletConnectTouchStyle}
              activeOpacity={0.2} onPress={() => !walletAddress ? setModalVisible(true) : onWalletInfo()}>
                {
                  walletAddress ? <>
                        <Image
                          source={require('../../assets/metamask.png')}
                          style={styles.buttonMetamaskIconStyle}
                        />
                        <Text style={styles.connectWalletAddressTextStyle}>{ walletAddress }</Text>
                    </>
                    : 
                    <Text style={styles.connectWalletApiiTextStyle}>Connect Wallet By App</Text>
                }
          </TouchableOpacity>
        </View>

        {/* <View style={styles.walletAppContainer}>
          <TouchableOpacity
              style={styles.buttonTouchStyle}
              activeOpacity={0.2}>
                <Text style={styles.connectWalletApiiTextStyle}>Connect Wallet By Scan</Text>
          </TouchableOpacity>
        </View> */}

        <Text style={styles.helloText}>Push Notification</Text>
        <View style={styles.BottomContainer}>
          {
            notificationData && notificationData.map((list, index) => (
              <View style={styles.notfButtonContainer} key={index}>
                <TouchableOpacity
                style={styles.notfbuttonTouchStyle}
                activeOpacity={0.2} onPress={() => onClickNotification(list)}>
                  <View style={styles.notfTitleContainerStyle}>
                    <View style={styles.alamAndDateStyle}>
                      {
                        list.notfType === "sellrequest" ? <Image
                            source={require("../../assets/alert.png")}
                            style={styles.buttonAlertIconStyle}
                          />
                          : <Image
                          source={require("../../assets/mail.png")}
                          style={styles.buttonMailIconStyle}
                        />
                      }
                      {/* <View style={styles.buttonIconSeparatorStyle} /> */}
                      <Text style={styles.notfDateTextStyle}>{list.transTime}</Text>
                    </View>
                      <Text style={styles.notfMesaageTextStyle}>{list.title}</Text>
                  </View>
                  <Image
                      source={require('../../assets/push_more.png')}
                      style={styles.NotfPushIconStyle}
                    />
                </TouchableOpacity>
              </View>
            ))
          }
          
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default HomePage
