import { View, Text, StyleSheet, SafeAreaView, Dimensions, Platform, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Appearance } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import CustomButton from '../Components/Button'
import InputWithCheck from '../Components/InputWithCheck';
import { colorList } from '../Components/colorList';
import * as AppleAuthentication from 'expo-apple-authentication';
const colorScheme = Appearance.getColorScheme();
const screen = Dimensions.get('window');
const Login = ({ navigation }) => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
      <LinearGradient
        colors={['#C5BEBE', '#C5BEBE']}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 0.7 }}
        style={styles.page}
      >
        <SafeAreaView>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? 'padding' : 'height'} style={{ flex: 1, justifyContent: 'center' }}>
            <View style={styles.box}>
              <View>
                <View>
                  <View style={styles.inputWrapper}>
                    <InputWithCheck
                      type={false}
                      onChangeText={(value) => {
                        if (!value.includes(' '))
                          setAccount(value)
                      }}
                      value={account}
                      placeholder={'Account'}
                      valid={account.length != 0}
                    />
                  </View>
                  <View style={styles.inputWrapper2}>
                    <InputWithCheck
                      type={true}
                      onChangeText={(value) => {
                        if (!value.includes(' '))
                          setPassword(value)
                      }}
                      placeholder={'Password'}
                      value={password}
                      maxLength={20}
                    />
                  </View>
                </View>

                <View style={{ paddingTop: screen.height * 0.015 }}>
                  <CustomButton
                  style={[styles.button, { backgroundColor: 'black' }]}
                    title={'Login'}
                    titleSize={20}
                    titleColor={colorList.ghostWhite}
                    onPress={()=>{
                      navigation.navigate('chat')
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {}}
                  >
                    <Text style={[styles.signup, { textDecorationLine: 'underline' }]}>Forgot your password?</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.others}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: screen.height * 0.015, }}>
                    {Platform.OS == 'ios' &&
                      <CustomButton
                        style={[styles.otherButton, { backgroundColor: "black",
                          justifyContent: 'center',
                          alignItems: 'center' }]}
                        titleSize={24}
                        titleColor={colorList.ghostWhite}
                        pack="Ionicon"
                        icon={'logo-apple'}
                        onPress={async () => {
                          try {
                            const credential = await AppleAuthentication.signInAsync({
                              requestedScopes: [
                                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                AppleAuthentication.AppleAuthenticationScope.EMAIL,
                              ],
                            });
                            // signed in
                          }
                          catch (e) {
                            if (e.code === 'ERR_REQUEST_CANCELED') {
                              console.log(e)
                            }
                            else {
                              // handle other errors
                            }
                          }
                        }}
                      />
                    }
                    <CustomButton
                      style={[styles.otherButton, { backgroundColor: "black" }]}
                      titleSize={24}
                      titleColor={colorList.ghostWhite}
                      pack = ""
                      icon={'meta'}
                    />
                    <CustomButton
                      style={[styles.otherButton, { backgroundColor: 'black' }]}
                      titleSize={24}
                      titleColor={colorList.ghostWhite}
                      pack = "Ionicon"
                      icon={'logo-google'}
                    />

                  </View>
                  <Text style={styles.signup}>Don't have an account ?</Text>
                  <TouchableOpacity
                    onPress={() => { navigation.navigate('SignUp') }}
                  >
                    <Text style={[styles.signup, { textDecorationLine: 'underline' }]}>Sign Up Here</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>

        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

export default Login

const styles = StyleSheet.create({
  page:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:
  {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 50,
    fontWeight: '400',
    textAlign: 'center'
  },
  box:
  {
    backgroundColor: 'rgba(0,0,0,0.37)',
    width: screen.width * 0.85,
    minHeight: '10%',
    alignSelf: 'center',
    borderRadius: 40,
    // shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 2,
      height: 5
    },
    // marginTop: screen.height * 0.02,
    paddingVertical: screen.height * 0.03,
    paddingHorizontal: screen.width * 0.05,
    // justifyContent: 'center',
  },
  inputWrapper:
  {
    paddingHorizontal: 20,
    // marginVertical: 5,
    height: screen.height * 0.09,
    justifyContent: 'space-around',
  },
  inputWrapper2:
  {
    paddingHorizontal: 20,
    marginVertical: 5,
    // height: screen.height * 0.09,
    // justifyContent: 'space-around',
  },
  button:
  {
    backgroundColor: '#f8f8ff',
    // opacity:0.2,
    width: screen.width * 0.7,
    paddingVertical: 10,
    borderRadius: 500,
    marginVertical: 10,
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },
  otherButton:
  {
    height: screen.height * 0.06,
    width: screen.height * 0.06,
    borderRadius: 500,
    marginVertical: 10,
    justifyContent: 'center',
    // alignSelf:'stretch'
  },
  others:
  {
    // backgroundColor:'red',
    // paddingHorizontal: 20,
    marginTop: screen.height * 0.015,
    borderTopWidth: 1,
    paddingTop: screen.height * 0.015,
    borderColor: colorList.ghostWhite,
  },
  signup:
  {
    color: colorList.ghostWhite,
    fontSize: 15,
    textAlign: 'center',
  }
})