import { View, Text, StyleSheet, SafeAreaView, Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import InputWithCheck from '../Components/InputWithCheck';
import CustomButton from '../Components/Button';
import { colorList } from '../Components/colorList';
import * as Haptics from 'expo-haptics';
import { signup } from '../server/signup_function';

const screen = Dimensions.get('window');
const Signup = ({navigation}) => {
  const [nickname, setNickname] = useState({ text: '', valid: false })
  const [email, setEmail] = useState({ text: '', valid: false });
  const emailRule = /^[\d\w._-]+@[\d\w._-]+\.[\w]+$/i;
  const [password, setPassword] = useState({ text: '', valid: false })
  const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
  const [confirm, setConfirm] = useState({ text: '', valid: false })
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
                <View style={styles.inputWrapper}>
                  <InputWithCheck
                    placeholder={'Nickname'}
                    onChangeText={(val) => {
                      if (val.length <= 20)
                        setNickname({ text: val, valid: val.length > 0 && val[val.length - 1] != ' ' && !val.includes('  ') })
                    }}
                    value={nickname.text}
                    valid={nickname.valid}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <InputWithCheck
                    placeholder={'Email'}
                    onChangeText={(val) => {
                      setEmail({ text: val, valid: val.search(emailRule) != -1 })
                    }}
                    value={email.text}
                    valid={email.valid}
                  />
                </View>
                {/*<View style={styles.inputWrapper}>
                  <InputWithCheck
                    placeholder={'CAPTCHA'}
                  />
                </View>*/}
                <View style={styles.inputWrapper}>
                  <InputWithCheck
                    placeholder={'Password'}
                    onChangeText={(val) => {
                      setPassword({ text: val, valid: val.search(passwordRule) != -1 })
                    }}
                    value={password.text}
                    valid={password.valid}
                    maxLength={20}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <InputWithCheck
                    placeholder={'Confirm Password'}
                    onChangeText={(val) => {
                      setConfirm({ text: val, valid: password.valid && val == password.text })
                    }}
                    value={confirm.text}
                    valid={confirm.valid}
                    maxLength={20}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <CustomButton
                    style={[styles.button, { backgroundColor: 'black'}]}
                    title={'Sign Up'}
                    titleSize={20}
                    titleColor={colorList.ghostWhite}
                    onPress={() => {
                      if (nickname.valid && email.valid && password.valid && confirm.valid) {
                        signup(nickname.text,email.text,password.text)
                        navigation.navigate('Login')
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                      }
                      else {
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                      }
                    }}
                  />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

export default Signup

const styles = StyleSheet.create({
  page:
  {
    // backgroundColor:'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper:
  {
    paddingHorizontal: 20,
    marginVertical: screen.height * 0.012,
  },
  button:
  {
    backgroundColor: '#f8f8ff',
    // opacity:0.2,
    width: screen.width * 0.7,
    paddingVertical: 10,
    borderRadius: 500,
    // marginVertical: 10,
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },
  box:
  {
    backgroundColor: 'rgba(0,0,0,0.37)',
    width: screen.width * 0.85,
    minHeight: '10%',
    alignSelf: 'center',
    borderRadius: 40,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 2,
      height: 5
    },
    // marginTop: screen.height * 0.02,
    paddingVertical: screen.height * 0.03,
    paddingHorizontal: screen.width * 0.05,
  },
  text:
  {
    fontSize: 50,
  }

})