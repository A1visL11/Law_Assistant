import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import InputBox from '../Components/InputBox';
import CustomButton from '../Components/Button';
import { fetchChatbaseResponse } from '../chatbase/api_fetch';
import { colorList } from '../Components/colorList';
import * as Haptics from 'expo-haptics';
import Markdown from 'react-native-markdown-display';

const screen = Dimensions.get('window');

const ChatbaseComponent = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState('');
  const [press, setPress] = useState(0);

  useEffect(() => {
    fetchChatbaseResponse(setResponse, setError, msg);
    // console.log(JSON.stringify(response))
  }, [press]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.page}>
        <SafeAreaView>
          <Text>{msg}</Text>
          {response ? (
            <Markdown style={styles.text}>{response}</Markdown>
          ) : error ? (
            <Text style={styles.error}>Error: {error}</Text>
          ) : (
            <Text style={styles.text}>Loading...</Text>
          )}
          <View style={styles.boxandbutton}>
            <View style={styles.input}>
              <InputBox onChangeText={(text) => { setMsg(text) }} />
            </View>
            <CustomButton
              style={styles.sendButton}
              titleSize={40}
              titleColor={colorList.black}
              pack="Ionicon"
              icon={'send'}
              onPress={() => {
                setPress(press + 1);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChatbaseComponent;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
  sendButton: {
    position: 'relative',
    alignSelf: 'flex-end',
    justifyContent: 'space-around',
  },
  page: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    flexDirection: 'column-reverse',
  },
  input: {
  
  },
  boxandbutton: {
    // alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
});
