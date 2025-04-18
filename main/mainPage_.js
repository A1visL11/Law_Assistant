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
import { fetchChatHistory, fetchChatbaseResponse, fetchGeminiResponse } from '../chatbase/api_fetch';
import { colorList } from '../Components/colorList';
import * as Haptics from 'expo-haptics';
import Markdown from 'react-native-markdown-display';

const screen = Dimensions.get('window');

const ChatbaseComponent = () => {
  // const [response, setResponse] = useState(null);
  // const [error, setError] = useState(null);
  const [msg, setMsg] = useState('');
  // const [press, setPress] = useState(0);
  const [chatLog,setChatLog]= useState([]);

  // useEffect(() => {
    // fetchChatbaseResponse(setResponse, setError, msg);
  // }, [press]);
  // const 
  const handleSendMsg=async()=>{
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const Log=await fetchGeminiResponse(msg,chatLog,setChatLog);
    setMsg('');
    setChatLog(Log);
  }
  return ( 
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.page}>
        <SafeAreaView>
          {/* <Text>{msg}</Text> */}
          {/* {response ? (
            <Markdown style={styles.text}>{response}</Markdown>
          ) : error ? (
            <Text style={styles.error}>Error: {error}</Text>
          ) : (
            <Text style={styles.text}>Loading...</Text>
          )} */}
          {chatLog&& 
            chatLog.map((content,index)=>
            {
              return(
                <Text key={index}>
                  {content.parts[0].text}
                </Text>
              )
            })
          }
          <View style={styles.boxandbutton}>
            <View style={styles.input}>
              <InputBox onChangeText={(text) => { 
                setMsg(text) 
              }}
              value={msg}/>
            </View>
            <CustomButton
              style={styles.sendButton}
              titleSize={40}
              titleColor={colorList.black}
              pack="Ionicon"
              icon={'send'}
              onPress={handleSendMsg}
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
    // justifyContent:'flex-end',
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
