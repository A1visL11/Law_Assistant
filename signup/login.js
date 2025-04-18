import { View, Text, Image, StyleSheet, SafeAreaView, Dimensions, Platform, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Appearance } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import CustomButton from '../Components/Button'
import InputWithCheck from '../Components/InputWithCheck';
import { colorList } from '../Components/colorList';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import { appleAuth, metaAuth } from './thirdPartyAuth';
import {loginUser} from '../server/signup_function';
import useAuth from '../hooks/useAuth';
import { auth, googleAuthProvider } from '../signup//firebase'; // Adjust the path as per your project structure
/*import { signInWithPopup , FacebookAuthProvider } from 'firebase/auth';*/
import { authentication } from '../signup/firebase';
// import env from 'react-native-dotenv';
// import {REACT_APP_GEMINI} from env


const colorScheme = Appearance.getColorScheme();
const screen = Dimensions.get('window');
const Login = ({ navigation }) => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const {user, setUser} = useAuth()
  // console.log(process.env)
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
          <Image
                source={require('../assets/OIG2.TDQDKQRUk.png')} /*/assets/OIG2.TDQDKQRUk.png*/ 
                style={styles.image}
              />
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
                  <View style={styles.inputWrapper}>
                    <InputWithCheck
                      type={true}
                      onChangeText={(value) => {
                        if (!value.includes(' '))
                          setPassword(value)
                      }}
                      placeholder={'Password'}
                      value={password}
                      maxLength={16}
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
                      // navigation.navigate('chat')
                      loginUser(account,password,setUser)
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {navigation.navigate('ForgotPs')}}
                  >
                    <Text style={[styles.signup, { textDecorationLine: 'underline' }]}>Forgot your password?</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.others}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: screen.height * 0.015, }}>
                    {Platform.OS == 'ios' &&
                      <CustomButton
                      style={[styles.otherButton, { backgroundColor: "black" }]}
                        titleSize={24}
                        titleColor={colorList.ghostWhite}
                        pack="Ionicon"
                        icon={'logo-apple'}
                        onPress={appleAuth}
                      />
                    }
                    <CustomButton
                      style={[styles.otherButton, { backgroundColor: "black" }]}
                      titleSize={24}
                      titleColor={colorList.ghostWhite}
                      pack = ""
                      icon={'meta'}
                      /*onPress={FacebookAuthProvider}*/
                    />
                    <CustomButton
                      style={[styles.otherButton, { backgroundColor: 'black' }]}
                      titleSize={24}
                      titleColor={colorList.ghostWhite}
                      pack = "Ionicon"
                      icon={'logo-google'}
                      onPress={() => promptAsync()}
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

//加入google的連結
const googleLogin = async () => {
  auth
    .signInWithPopup(googleAuthProvider)
    .then(async (result) => {
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/client");
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.message);
    });
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 50,
    fontWeight: '400',
    textAlign: 'center',
  },
  box: {
    backgroundColor: 'rgba(0,0,0,0.37)',
    width: screen.width * 0.85,
    minHeight: '10%',
    alignSelf: 'center',
    borderRadius: 40,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 2,
      height: 5,
    },
    paddingVertical: screen.height * 0.03,
    paddingHorizontal: screen.width * 0.05,
  },
  inputWrapper: {
    paddingHorizontal: 20,
    height: screen.height * 0.08,
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#f8f8ff',
    width: screen.width * 0.7,
    paddingVertical: 11,
    borderRadius: 500,
    marginVertical: 10,
    marginTop: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  otherButton: {
    height: screen.height * 0.06,
    width: screen.height * 0.06,
    borderRadius: 500,
    marginVertical: 10,
    justifyContent: 'center',
  },
  others: {
    marginTop: screen.height * 0.015,
    borderTopWidth: 1,
    paddingTop: screen.height * 0.015,
    borderColor: colorList.ghostWhite,
  },
  signup: {
    color: colorList.ghostWhite,
    fontSize: 15,
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 50,
    borderRadius: 75, // Adjust borderRadius to make it circular
  },
})